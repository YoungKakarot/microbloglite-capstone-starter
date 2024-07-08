function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
 
  document.getElementById('mySidepanel').addEventListener('click', function() {
    // Clear user session or token
    // For example, if using localStorage:
    localStorage.removeItem('userToken');

    // Redirect to login page or home page
    window.location.href = 'index.html';
});