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

		if (total === 0) {
			return "#555555";
		}

		let likePercent = Math.round((this.likes / total) * 100);
		let dislikePercent = 100 - likePercent;
		likePercent += "%";
		dislikePercent += "%";
		return { likePercent, dislikePercent };
	}
}

document.addEventListener("DOMContentLoaded", function () {
	main();
});

// Create a media object for all the movies and shows
function getMediaIds() {
	const media = $(".rate");
	const ids = [];
	media.each(function () {
		const id = $(this).attr("id");
		ids.push(id);
	});
	return ids;
}

function main() {
	// Create the media objects for the movies and tv shows
	for (id of getMediaIds()) {
		allMedia[id] = new Media(id);
	}

	// Add event listeners for the like and dislike buttons
	setupLikeDislike();
}

// Like and Dislike button
function setupLikeDislike() {
	const rateElements = $(".rate");

	rateElements.each(function () {
		const id = $(this).attr("id");

		// Add event listeners to the like and dislike buttons
		const likeButton = $(this).find("button:nth-of-type(1)");
		likeButton.on("click", function () {
			handleLike(id);
		});

		const dislikeButton = $(this).find("button:nth-of-type(2)");
		dislikeButton.on("click", function () {
			handleDislike(id);
		});
	});
}

function updateVoteBar(id) {
	let { likePercent, dislikePercent } = allMedia[id].split;

	let parent = $("#" + id).parent();
	let voteBar = parent.find(".vote-bar");

	voteBar.find(".like-bar").css("width", likePercent);
	voteBar.find(".dislike-bar").css("width", dislikePercent);

	voteBar.find(".like-count").text(allMedia[id].likes);
	voteBar.find(".dislike-count").text(allMedia[id].dislikes);
	console.log(likePercent, dislikePercent);
}

function handleLike(id) {
	allMedia[id].likes++;
	updateVoteBar(id);
}

function handleDislike(id) {
	allMedia[id].dislikes++;
	updateVoteBar(id);
}
