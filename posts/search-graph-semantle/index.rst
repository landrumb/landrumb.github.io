.. title Search Graph Semantle
.. slug search-graph-semantle
.. date: 2025-01-30 


Below is a clone of the game `Semantle <https://semantle.com/>`_, my favorite of the countless Wordle variants that cropped up during its heyday. Much like Wordle, it's a word-guessing game where you try to find the secret in as few guesses as possible, but instead of getting feedback on the accuracy of letters in the word, you get the *semantic similarity* between your guess and the secret. 

Mechanically, semantic similarity is computed here by the cosine similarity between embeddings of the guess and the secret. The embeddings used here (and in the real Semantle) are `word2vec-google-news-300 <https://code.google.com/archive/p/word2vec/>`_ embeddings, which are trained on a large corpus of Google News articles. I've restricted the vocabulary to the top 50k words by frequency, and within that set filtered to only lowercase words and phrases. 

Why this is interesting
-----------------------

High-dimensional vector search is difficult to visualize, reason intuitively about, or explain to a non-technical audience. Semantle exists as an example of people doing vector search. You have some preconception of the layout of the dataset (i.e. you know what words mean), and you can choose vectors (words) to compare to some query (the secret word). Hopefully, by playing this game and exploring the associated search graph, you can get a better sense of how vector search works.

How search graphs work
----------------------

For those unfamiliar, a *graph* is a general way of representing relationships between collections of things. The things in question are *nodes* (*vertices* is also common), and if thing *A* and thing *B* have a relationship we want to record in the graph, they have an *edge* between them in the graph. Classic examples include:

* Social networks, where people are nodes and friendships are edges
* Road networks, where intersections are nodes and roads are edges
* The internet, where webpages are nodes and links are edges

Imagine you're on a road trip, and you know the general direction of the city you're trying to get to, but you don't have turn-by-turn directions. It's very natural to imagine that every time you have to choose between two roads on your trip, you look at the signage, (I'm imagining a highway sign that tells you what towns are at a given exit) and you pick whichever road names the city closer to your destination. If you keep doing this every time you pick between two cities, you'll eventually get to a sign that says the city you want, and you'll take that turn to end your journey. This is called a *greedy* search. 


How to play
-----------

This version of Semantle has essentially the same interface as the original, which is played by entering guesses in the text box until you find the secret, at which point you win and the game is over. The only major difference is that clicking on a guess will show you the neighbors of that word in a search graph built over the embeddings. If you click a neighbor, it will guess that word for you. 


.. raw:: html

    <div id="backend-status" style="font-weight: bold; padding: 10px; color: blue; background: lightgrey; width: 200px; text-align: center;">Checking backend status...</div>

    <script>
        async function checkBackendStatus() {
            let statusDiv = document.getElementById("backend-status");
            statusDiv.textContent = "Warming up...";
            statusDiv.style.color = "orange";

            try {
                let res = await fetch("https://semantle-graph.onrender.com/healthcheck", { method: "GET" });

                if (res.ok) {
                    statusDiv.textContent = "Warm";
                    statusDiv.style.color = "green";
                } else {
                    statusDiv.textContent = "Down";
                    statusDiv.style.color = "red";
                }
            } catch (e) {
                statusDiv.textContent = "Down";
                statusDiv.style.color = "red";
            }
        }

        window.addEventListener("load", checkBackendStatus);
        statusDiv.addEventListener("click", checkBackendStatus);
    </script>

The above should be checking for the status of the backend, which takes a while to warm up after a period of inactivity. If it's showing "Down" in red, send me an email and I will try to fix it.

.. raw:: html

    <style>
        .wrapper {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        .iframe-container {
            flex-grow: 1;
            width: 100%;
            border: none;
        }
    </style>

    <div class="wrapper">
        <iframe class="iframe-container" src="/assets/html/vamana-semantle.html"></iframe>
    </div>