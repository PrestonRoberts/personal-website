// Global 
var allMedia = {};

// Movie and show like and dislikes
class Media {
    constructor(name) {
        this.name = name;
        this.likes = 0;
        this.dislikes = 0;
    }

    // Generate the like/dislike bar color
    get split() {
        const total = this.likes + this.dislikes;
        
        if(total === 0) {
            return "#555555"
        }

        let likePercent = Math.round((this.likes / total) * 100);
        let dislikePercent = (100 - likePercent);
        likePercent += "%"
        dislikePercent += "%"
        return {likePercent, dislikePercent};
    }
}

document.addEventListener('DOMContentLoaded', function() {
    main();
});

// Create a media object for all the movies and shows
function getMediaIds() {
    const media = document.querySelectorAll('.rate');
    const ids = [];
    for (let i = 0; i < media.length; i++) {
      const id = media[i].id;
      ids.push(id);
    }
    return ids;
}

function main() {
    // Create the media objects for the movies and tv shows
    for(id of getMediaIds()) {
        allMedia[id] = new Media(id);
    }

    // Add event listeners for the like and dislike buttons
    setupLikeDislike();
}


// Like and Dislike button
function setupLikeDislike() {
    const rateElements = document.querySelectorAll('.rate');

    rateElements.forEach((rateElement) => {
        const id = rateElement.getAttribute('id');
        
        // Add event listeners to the like and dislike buttons
        const likeButton = rateElement.querySelector('button:nth-of-type(1)');
        likeButton.addEventListener('click', () => {
            handleLike(id);
        });
        
        const dislikeButton = rateElement.querySelector('button:nth-of-type(2)');
        dislikeButton.addEventListener('click', () => {
            handleDislike(id);
        });
    });
}

function updateVoteBar(id) {
    let {likePercent, dislikePercent} = allMedia[id].split;

    let parent = document.getElementById(id).parentNode;
    let voteBar = parent.querySelector('.vote-bar');

    voteBar.querySelector('.like-bar').style.width = likePercent;
    voteBar.querySelector('.dislike-bar').style.width = dislikePercent;

    voteBar.querySelector('.like-count').textContent = allMedia[id].likes;
    voteBar.querySelector('.dislike-count').textContent = allMedia[id].dislikes;
    console.log(likePercent, dislikePercent)
}

function handleLike(id) {
    allMedia[id].likes ++;
    updateVoteBar(id);
}
  
function handleDislike(id) {
    allMedia[id].dislikes ++;
    updateVoteBar(id);
}