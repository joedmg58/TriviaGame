$(document).ready( function() {

    // variable definitions
    const MAX_TIME = 30; //max time in seconds for the quiz
    var timeElapsed = 0; //time elapsed in seconds since game start
    var timer; //timer variable
    var quizCompleted = false; //is true when the user press the botton done
    var correct = 0; 
    var incorrect = 0; 
    var unanswered = 0;
    var correctAnswersKey = []; //[1,2,3,4,3,2,1,4];

    //set of question and answers
    var quiz = [
        {
            question: 'What was the first full length CGI movie ?',
            options: ["A bug's Life",'Monsters Inc.','Toy Story','The Lion King'],
            answer: 3
        }, 
        {
            question: 'Which of these is NOT a name of one of the Queen rock band ?',
            options: ['Brian May','Roger Taylor','John Deacon','Fred Astaire'],
            answer: 4
        }, 
        {
            question: 'Which of these is NOT a character from Star Wars movies ?',
            options: ['Chewbacca','Lone Ranger','Kylo Ren','Boba Fett'],
            answer: 2
        }, 
        {
            question: 'Which group released the hit song, "Smell Like Teen Spirit" ?',
            options: ['Nirvana','Backstreet Boys','The Offspring','No Doubt'],
            answer: 1
        }, 
        {
            question: 'The Concorde was a supersonic passenger airliner flown by which two airlines ?',
            options: ['Qatar Airways','Air Canada','Air France and British Airways','American Airline and Aeroflot'],
            answer: 3
        },
        {   question: 'In what country would you find large ancient geoglyphs known as the the Nasca Lines?',
            options: ['Mexico','Peru','Venezuela','Colombia'],
            answer: 2
        }, 
        {
            question: 'Who was the first woman to be inducted into the Rock and Roll Hall of Fame?',
            options: ['Annie Lenox','Tina Turner','Joni Mitchell','Aretha Franklin'],
            answer: 4
        }, 
        {
            question: 'What American music duo released the studio album “Sounds of Silence” in 1966?',
            options: ['Simon & Garfunkel','The Righteous Brothers','Sam &n Dave','Richard & Linda Thompson'],
            answer: 1
        }
    ];

    //create quiz
    
    for ( var i = 0; i < quiz.length; i++ ){
        var answer = i+1;
        var form = $('<form>');
        form.append( $('<h4>').text( quiz[i].question ) );
        for ( var j = 0; j < quiz[i].options.length; j++ ) {
            var value = j+1;
            var div = $('<div>').addClass( 'form-check-inline' );
            var label = $('<label for="q'+answer+value+'">').addClass( 'form-check-label' );
            //var radio = $('<input type="radio" id="q'+answer+value+'" name="answer'+answer+'" value="' + value + '">');
            var radio = $('<input>').attr({
                type: 'radio',
                id: 'q'+answer+value,
                name: 'answer'+answer,
                value: value
            });
            radio.addClass( 'form-check-input' );
            label.append( radio );
            label.append( quiz[i].options[j] );
            div.append( label );
            form.append( div );
        }
        //$('#quizCol').append( form );
        form.insertBefore( "#btnDone" );
        correctAnswersKey.push( quiz[i].answer );
    }

    
    //register on click event for start button
    $('#btnStart').click( gameStart );

    function gameStart() {
        console.log( 'Game started' );
        //hide button
        $('#colBtnStart').hide();
        //show timer
        $('#timeRemain').text( MAX_TIME );
        $('#timer').show();
        //show options
        $('#quizContainer').show();
        //start timer
        timer = setInterval( eachSecond, 1000 ); //run eachSecond() function every second;
    }

    function eachSecond() {
        //update timeElapsed variable
        timeElapsed++;
        console.log( 'Time Elapsed (s): ' + timeElapsed );
        //update time remaining on screen
        $('#timeRemain').text( MAX_TIME - timeElapsed);
        //check if timeElapsed has reach the MAX_TIME or quiz has completed to show the results
        if ( ( timeElapsed >= MAX_TIME ) || ( quizCompleted ) ) {
            clearInterval( timer );
            showResult();
        }
    }

    //register on click event for done button
    $('#btnDone').click( userDone );

    function userDone() {
        console.log( 'User has pressed the button DONE.' );
        quizCompleted = true;
    }

    function showResult() {
        console.log('Showing the result...');
        //hide timer and questions
        $('#timer').hide();
        $('#quizContainer').hide();
        //compare results with answers key
        for ( var i=0; i < correctAnswersKey.length; i++ ) {
            var index = i+1;
            var answer = $("input[name='answer" + index + "']:checked").val();
            if ( answer == correctAnswersKey[i] ) {
                correct++;
            } else if ( answer == undefined ) {
                unanswered++;
            } else {
                incorrect++;
            }
        }
        //update results on screen
        $('#correct').text( correct );
        $('#incorrect').text( incorrect );
        $('#unanswered').text( unanswered );
        //show result container
        $('#resultContainer').show();
    }

} );