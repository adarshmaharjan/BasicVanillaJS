//selected elements
const sidebarToggle = document.querySelector('.sidebar-toggle');
const coloseBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');

//sidebar-toggle through btn

sidebarToggle.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar');
});

// closebtn of sidebar

coloseBtn.addEventListener('click', function(){
    sidebar.classList.remove('show-sidebar');
});