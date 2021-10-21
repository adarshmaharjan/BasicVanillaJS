//using selectors inside the element
// traversing the dom

// const qsnBtns = document.querySelectorAll('.question-btn');
const qsns = document.querySelectorAll('.question');

// selecting parent elements and adding class

/* qsnBtns.forEach( function(qsnbtn){
    qsnbtn.addEventListener('click', function(e){
         console.log(e.currentTarget.parentElement.parentElement);
        const question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle('show-text');
    });
}) */ 

qsns.forEach(function (qsn){
    // console.log(qsn);
    const btn = qsn.querySelector('.question-btn'); 
    // console.log(btn);
  
    btn.addEventListener('click', function(){
        qsns.forEach(function(item){
            if(item !== qsn)
                item.classList.remove('show-text');
        });

        qsn.classList.toggle('show-text');
    });
   
});

