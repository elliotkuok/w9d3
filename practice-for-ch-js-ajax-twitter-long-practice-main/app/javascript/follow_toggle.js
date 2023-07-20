import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    // Your code here
    this.toggleButton = toggleButton;
    this.handleClick = this.handleClick.bind(this);
    this.toggleButton.addEventListener("click", this.handleClick);
    this.followState = "following";
    this.render();
    broadcast(this.followState);
    API.follow(this.followState);
  }

  async handleClick(event) {
    // Your code here
    event.preventDefault();
    if (this.followState === "following") {
      await this.unfollow();
    } else {
      await this.follow();
    }
    this.followState = this.followState === "following"? "unfollowing" : "following";
    
  }

  async follow() {
    this.toggleButton.disabled = true;
    this.toggleButton.innerText = "Following..."
    try {
      this.followState = "following";
      this.render();
    } catch (error) {
      console.error("Error following user:", error)
    }

    this.toggleButton.disabled = false;
  }

  async unfollow() {
    this.toggleButton.disabled = true;
    this.toggleButton.innerText = "Unfollowing..."
    try {
      this.followState = "unfollowed";
      this.render();
    } catch (error) {
      console.error("Error following user:", error)
    }

    this.toggleButton.disabled = false;
  }

  render() {
    switch (this.followState) {
      case "following":
        this.toggleButton.innerText = "Unfollow";
        break;
      case "unfollowed":
        this.toggleButton.innerText = "Follow";
        break;
      default:
        this.toggleButton.innerText = "Loading...";
        this.toggleButton.disabled = true;
        break;
    }
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}

const FollowToggleButton = document.getElementsByClassName("follow-toggle");

async function handleFollowUnfollow() {

  const isFollowing = await followState();
  const method = isFollowing ? "DELETE" : "POST";

  try {
    const res = await fetch('/users/${userId}/follow', {
      method: method,
      // body: JSON.stringify({gif}), //{gif: gif}
      headers:{'Content-Type': 'application/json', 'Accept': 'application/json'}
    });
    if (res.ok) {
      isFollowing ? (followToggleButton.innerText = "Follow") : (followToggleButton.innerText = "Unfollow")
    }
  } catch (error) {
    console.error("Error occurred during follow/unfollow:", error);
  }
  
}