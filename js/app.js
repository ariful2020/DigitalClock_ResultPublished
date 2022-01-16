
//============ Digital Clock Start============//

const time_result = document.querySelector('#time_result');
const h = document.querySelector('#h');
const m = document.querySelector('#m');
const s = document.querySelector('#s');
const am_pm = document.querySelector('#am_pm');
const d = document.querySelector('#d');

setInterval(() => {

    let date = new Date ();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let mon = date.getMonth();
    let tarikh = date.getDate();
    let year = date.getFullYear();
    let month = 1 + mon ;

   let hr = (hours > 12) ? `${hours - 12}` : `${ hours}`;
   let mont = (month < 10 ) ? `0${month}` : `${month}`;
   let tar = (tarikh < 10 ) ? `0${tarikh}` : `${tarikh}`;
   
    h.innerHTML = (hr < 10 ) ? `0${hr}` : `${hr}`;
    m.innerHTML = (min < 10 ) ? `:0${min}` : `:${min}`;
    s.innerHTML = (sec < 10 ) ? `0${sec}` : `${sec}`;
    am_pm.innerHTML = (hours < 12) ? "AM" : "PM";
    d.innerHTML = `${mont} - ${tar} - ${year}`;
   
}, 1000);
//============ Digital Clock End============ //

//============ Counter with loader Start============//

const progress_bar = document.querySelector('.progress-bar');
const input_number = document.querySelector('#input_number');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const counter_result= document.querySelector('#counter_result');


console.log(progress_bar.innerText);

let counter;
let clear_count ;
start.addEventListener('click', () => {

    counter = input_number.value;
   
    clear_count = setInterval(() => {

        let width = coun_load(input_number.value, counter);
        counter_result.innerHTML =  `<h1> ${counter}</h1>`;
        progress_bar.style.width = `${width}%`;
        progress_bar.innerText = `${Math.floor(width)}%`;

        if(width > 50 && width <= 100){
            progress_bar.style.backgroundColor="#dc3545";
        }else if (width <= 50 && width > 25){
            progress_bar.style.backgroundColor="green"
        }else if (width <= 25){
            progress_bar.style.backgroundColor="black"
        }

        if (counter < 10){
            counter_result.innerHTML =  `<h1> 0${counter}</h1>`;
        }else{
            counter_result.innerHTML =  `<h1> ${counter}</h1>`;
        }

        if (counter == 0){
            clearInterval(clear_count)
        }

        counter--;

    }, 1000);

    stop.addEventListener('click', () => {
        clearInterval(clear_count);
    })

})




//============= Counter with loader End=============//

//============ Todo List Start============//

const to_do = document.querySelector('#to_do');
const add_list = document.querySelector('#add_list');
const reset_list = document.querySelector('#reset_list');
const todo_list = document.querySelector('#todo_list');

add_list.addEventListener('click', () => {
    let to_do_value = to_do.value;
    let p = document.createElement('p');
    p.innerHTML = `
     <div class="alert alert-warning alert-dismissible fade show" role="alert">
        ${to_do_value}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    todo_list.appendChild(p);
    to_do.value = '';

    reset_list.addEventListener('click', () => {
    todo_list.removeChild(p);
})

})

//============= Todo List End=============//

//============= Result Calculation Start=============//
const result_cal = document.querySelector('#result_cal');
const r_btn      = document.querySelector('#r_btn');
const exam_result= document.querySelector('#exam_result')


const basic_info = document.querySelector('#basic_info')
const noti       = document.querySelector('#notifi')

const f_name     = document.querySelector('#f_name');
const l_name     = document.querySelector('#l_name');
const roll       = document.querySelector('#roll');
const reg        = document.querySelector('#reg');
const dept       = document.querySelector('#dept');
const pass_year  = document.querySelector('#pass_year');

const Ban = document.querySelector('#Ban');
const Eng = document.querySelector('#Eng');
const G_math= document.querySelector('#Math');
const Sos = document.querySelector('#Sos');
const Rel = document.querySelector('#rel');
const Phy = document.querySelector('#Phy');
const Che = document.querySelector('#Che');
const Bio = document.querySelector('#Bio');



result_cal.addEventListener('submit', (e) => {
    e.preventDefault();
    let bn  = Number(Ban.value);
    let en  = Number(Eng.value);
    let mat = Number(G_math.value);
    let sos = Number(Sos.value);
    let rel = Number(Rel.value);
    let phy = Number(Phy.value);
    let che = Number(Che.value);
    let bio = Number(Bio.value);

    let total_marks = bn + en + mat + sos + rel + phy + che + bio;
    
    let total_point = s_grade(bn).points + s_grade(en).points + s_grade(mat).points + s_grade(sos).points + s_grade(rel).points + s_grade(phy).points + s_grade(che).points + s_grade(bio).points
    let final_grade = total_point / 8;
   
    let f_grade = final_grade.toFixed(2);
   
    function failCal(bng, eng, math, sosc, reli, ph, ch, bi){
        
       let faileds;
   
       if(bng == 0 || eng == 0|| math == 0 || sosc == 0 || reli == 0 || ph == 0 || ch == 0 || bi == 0){
           faileds = `Failed`
       }else {
           faileds =`${total_grade(final_grade)}`
       }
       return faileds;
    }

    function fail_pending(fail){
        if (fail == "Failed"){
            return "Pending"
        }else{
            return f_grade;
        }
    }
     function noti(notifi){
        if (notifi == "Failed"){
            return `<h4 class="alert alert-warning text-uppercase text-center">Sorry! You Failed</h4>`
        }else{
            return `<h4 class="alert alert-success text-uppercase text-center">Congratulations</h4>`
        }
     }



    let fail_pen = failCal(s_grade(bn).points,s_grade(en).points,s_grade(mat).points,s_grade(sos).points,s_grade(rel).points,s_grade(phy).points,s_grade(che).points,s_grade(bio).points)

    if (f_name.value == '' || l_name.value == '' || roll.value == '' || reg.value == '' || dept.value == '' || pass_year.value == '' || bn == '' || en == ''|| mat == '' || sos == '' || rel == '' || phy == '' || che == '' || bio == '') {
        exam_result.innerHTML  = `<h2 class = "alert alert-warning text-center text-uppercase my-5"> All Field Are Required </h2>`
    }else{
        exam_result.innerHTML = `
        <div id = "notifi">
        ${noti(fail_pen)}
        </div> 
        <div id="basic_info">
            <span class="d-block">Name <span class="m_1">:</span> ${f_name.value} ${l_name.value}</span>
            <span class="d-block">Roll <span class="m_2">:</span> ${roll.value}</span>
            <span class="d-block">Registration : ${reg.value}</span>
            <span class="d-block">Department : ${dept.value}</span>
            <span class="d-block">Passing Year : ${pass_year.value}</span>
            <span class="d-block">Grade <span class="m_3">: ${fail_pen}</span></span>
        </div>
        <hr>
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Points</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>101</td>
                    <td>Bangla</td>
                    <td>${bn}</td>
                    <td>${s_grade(bn).points}</td>
                    <td>${s_grade(bn).grade}</td>
                </tr>
                <tr>
                    <td>102</td>
                    <td>English</td>
                    <td>${en}</td>
                    <td>${s_grade(en).points}</td>
                    <td>${s_grade(en).grade}</td>
                </tr>
                <tr>
                    <td>103</td>
                    <td>Mathematics</td>
                    <td>${mat}</td>
                    <td>${s_grade(mat).points}</td>
                    <td>${s_grade(mat).grade}</td>
                </tr>
                <tr>
                    <td>104</td>
                    <td>Social Science</td>
                    <td>${sos}</td>
                    <td>${s_grade(sos).points}</td>
                    <td>${s_grade(sos).grade}</td>
                </tr>
                <tr>
                    <td>105</td>
                    <td>Religion</td>
                    <td>${rel}</td>
                    <td>${s_grade(rel).points}</td>
                    <td>${s_grade(rel).grade}</td>
                </tr>
                <tr>
                    <td>106</td>
                    <td>Physics</td>
                    <td>${phy}</td>
                    <td>${s_grade(phy).points}</td>
                    <td>${s_grade(phy).grade}</td>
                </tr>
                <tr>
                    <td>107</td>
                    <td>Chemistry</td>
                    <td>${che}</td>
                    <td>${s_grade(che).points}</td>
                    <td>${s_grade(che).grade}</td>
                </tr>  
                <tr>
                    <td>108</td>
                    <td>Biology</td>
                    <td>${bio}</td>
                    <td>${s_grade(bio).points}</td>
                    <td>${s_grade(bio).grade}</td>
                </tr>    
            </tbody>
            <tfoot>
                <tr class="alert alert-success">
                    <td></td>
                    <td></td>
                    <td>Total Marks : ${total_marks}</td>
                    <td>GPA : ${fail_pending(fail_pen)}</td>
                    <td>Grade :${fail_pen}</td>
                </tr> 
            </tfoot>
        </table>
        ` 

    }
    

    l_name.value = "";
    f_name.value = "";
    roll.value = "";
    reg.value = "";
    dept.value = "";
    pass_year.value = "";
    Ban.value = "";
    Eng.value = "";
    G_math.value = "";
    Bio.value = "";
    Che.value = "";
    Phy.value = "";
    Rel.value = "";
    Sos.value = "";
})
















//============== Result Calculation End==============//