var test = [
    {"Что вас вдохновляет на работу?":{
        	"Деньги": 5,
        	"Желание сделать мир лучше": 10,
        	"Ничего не вдохновляет": 3,
        	"Какая работа?! Я ж ещё учусь": 0
        }
    },
    {"Вы оказались на необитаемом острове с Геннадием Русских. Что будете делать?":
        {
        	"Пойду своим путём": 10,
        	"Попытаюсь подружиться": 5,
        	"Съем его": 3,
        	"Кто такой Геннадий Русских?":0
        }
    },
    {"Что вы делаете когда въезжаете в яму?":
        {
        	"Говорю «Спасибо» мэру за дороги": 0,
        	"Выхожу из машины и засыпаю щебнем": 3,
        	"Ну, ё-моё!": 5,
        	"Смиренно молчу и еду дальше": 10
        }
    },
    {"Чем займётесь в выходные?":
        {
        	"Буду «разлагаться» на диване": 0,
        	"Как всегда: друзья, клубы, вечеринки…": 3,
        	"Уделю время родным и близким": 5,
        	"Буду бороздить снежные вершины на горных лыжах": 10
        }
    },
    {"По городу гуляют коровы! Что делать? ":
        {
        	"Ну пусть себе гуляют, травку жуют": 5,
        	"Хозяевам нужно лучше следить за своими животными!": 10,
        	"Здорово! Люблю коров ^_^": 0,
        	"Что-то делать надо, но что — не понятно": 3
        }
    },
    {"Какая музыка играет в ваших наушниках? ":
        {
        	"Классическая":5,
        	"Что-то жутко популярное": 0,
        	"У меня особый вкус": 3,
        	"У меня нет наушников":10
        }
    },
    {"Кто виноват в провале капремонта дорог?":
        {
        	"Заказчик":3,
	        "Подрядчик":10,
	        "Оба «хороши»":5,
	        "Масоны":0
    	}
    },
    {"Если бы у вас был камин, какой газетой вы бы его растопили?":
        {
        	"Качканарский Рабочий":5,
	        "Качканарское время":0,
	        "Качканарский четверг":10,
	        "Новый Качканар":3
	    }
    },
    {"Что будет с Качканаром через десять лет?":
        {
        	"Превратится в город-курорт":10,
        	"Станет населённым пунктом для обслуживания комбината":0,
        	"Да ничего особо не изменится":3,
        	"Не знаю. Всякое может быть…":5
        }
    },
    {"Как вы передвигаетесь по городу в темное время суток?":
        {
        	"Пробираюсь в кромешной тьме, как ниндзя":5,
        	"Не бывает у нас темного времени, всегда фонари светят":3,
        	"Исключительно с фонариком":0,
        	"Не выхожу из дома ночью, мало ли что…":10
        }
    }
];

var question = 0; // 1 потому что первый вопрос в html прописан
var result = 0;

// Заполняем прогресс
for (var i = 0; i < test.length; i++) {
	$('.progress').append('<li>'+(i+1)+'</li>');
}
$('.progress li').eq(0).addClass('active');

// Действие по клику на ответ
$('.answers').on('click', 'li a', function(e) {
	e.preventDefault();

	result += $(this).parent('li').data('p');

	if (question == test.length-1) {
		showResult();
		return;
	}

	var nextQuestion = question+1;

    // Анимация
    $('main').fadeOut(function(){
        $('.progress li').removeClass('active');
        $('.progress li').eq(question).addClass('archive');

        // Next question
        $('.progress li').eq(nextQuestion).addClass('active');


        $('.question').text(Object.keys(test[nextQuestion]));

        $('.face').attr('src', 'img/faces/'+(nextQuestion+1)+'.png');


        $('.answers li').remove();
        $.each(test[nextQuestion][ Object.keys(test[nextQuestion]) ], function(index, val) {
            $('.answers').append('<li data-p="'+val+'"><a href="#">'+ index +'</a></li>');
        });
    }).fadeIn();

	question = nextQuestion;
});


function showResult(){
    $explanation = $('.result-explanation');
    if(result <= 35) {
        $explanation.html('Твой внутренний Набоких очень мал, его и твои взгляды на жизнь диаметрально противоположны. <br>Вероятней всего, ты считаешь Сергея Набоких плохим управленцем и во всех городских проблемах винишь только его. ');
    } else if (result <= 70) {
        $explanation.html('Твой внутренний Сергей Набоких на среднем уровне. Это означает, что между тобой и главой города есть что-то общее: в мировоззрении, культурных предпочтениях и не только. Но нельзя забывать и о разногласиях.<br>Разбираясь в городских проблемах, ты не спешишь кого-то обвинять, а стараешься подойти к вопросу максимально объективно. ');
    } else if (result <= 100) {
        $explanation.html('Твой внутренний Сергей Набоких необычайно велик. Если бы выборы мэра не отменили, твой внутренний голос обязательно заставил тебя поставить галочку напротив его имени. Может и неосознанно, но тем не менее ты поддерживаешь действующего главу почти во всех вопросах. Ты искренне веришь в его честность и непогрешимость. Именно такие люди как ты и являются электоратом и опорой местной власти.');
    }
	$('main').hide();
	$('.percentage').text(result);
    $('.result').show();
}


// Прелоад
for (var i = 1; i <= test.length; i++) {
    $("<img />").attr("src", 'img/faces/' + i + '.png');
}
