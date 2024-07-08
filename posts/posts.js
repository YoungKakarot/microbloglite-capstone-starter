
/* Posts Page JavaScript */

// "use strict";

function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
//    Set the width of the sidebar to 0 (hide it) 
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  } 
  // posts.js

// Function to fetch posts from the API
const loginData = getLoginData();     
async function fetchPosts() {
    const apiUrl = 'http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts'; // Replace with your API endpoint
    try {
        const response = await fetch(apiUrl,{
            headers:{
                Authorization: `Bearer ${loginData.token}`,
            }
        }); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; // Assuming API returns an array of posts
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array in case of error
    }
}

// Function to render posts on the page
function renderPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Clear previous content
    const ul = document.createElement('ul');

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = post.text; // Replace with the appropriate field from your API response
        ul.appendChild(li);
    });

    postsContainer.appendChild(ul);
}

// Function to initialize the page
async function init() {
    const posts = await fetchPosts();
    renderPosts(posts);
}

// Call init function when the page loads
window.onload = init;

// Function to post new content
async function postNewContent(content) {
    const apiUrl = 'http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts'; // Replace with your API endpoint
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginData.token}`,
            },
            body: JSON.stringify({ text: content }),
        });

        if (!response.ok) {
            throw new Error('Failed to post content');
        }

        const data = await response.json();
        return data; // Assuming API returns the newly created post object
    } catch (error) {
        console.error('Error posting data:', error);
        return null;
    }
}

// Function to handle form submission (assuming you have a form for posting)
document.getElementById('postForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const content = document.getElementById('postContent').value.trim(); // Assuming your input field id is 'postContent'

    if (content !== '') {
        const newPost = await postNewContent(content);
        if (newPost) {
            // Clear input field or update UI as needed
            document.getElementById('postContent').value = '';
            // Optionally, fetch and re-render posts after successful post
            const updatedPosts = await fetchPosts();
            renderPosts(updatedPosts);
        } else {
            alert('Failed to post content. Please try again.');
        }
    } else {
        alert('Please enter some content before posting.');
    }
});

// Function to initialize the page
async function init() {
    const posts = await fetchPosts();
    renderPosts(posts);
}

// Call init function when the page loads
window.onload = init;