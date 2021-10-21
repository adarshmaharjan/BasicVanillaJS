//variables
let count  = 0;

//dom elements

const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');
// const btn = document.querySelector('.btn');

btns.forEach(function (btn) {
    btn.addEventListener('click', function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')){
            count--;
        }else if(styles.contains('increase')){
            count++
        }else{
            count = 0;
        }
        if(count > 0)
            value.style.color = 'green';
        else if(count < 0)
            value.style.color = 'red'
        if(count === 0)
            value.style.color = '#222222';
        value.textContent = count;
    });
});
