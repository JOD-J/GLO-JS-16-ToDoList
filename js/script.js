"use strict";

let 
	// форма списка туду
	todoControlElem = document.querySelector('.todo-control'),
	// добовление туду листа
	headerInputElem = document.querySelector('.header-input'),
	// кнопка добовления туду листа
	headerButtonElem = document.querySelector('.header-button'),
	//  контейнер туду листа
	todoContainerElem = document.querySelector('.todo-container'),
	// не выполненый туду лист
	todoLisElemt = document.querySelector('.todo-list'),
	// выполненый туду лист
	todoCompletedElem = document.querySelector('.todo-completed'),
	// смена туду листа
	todoСompleteElem = document.querySelector('.todo-complete');


// отправть в localStorage метод 
let setState = function () {
    localStorage.setItem('todoData', JSON.stringify(todoData));
};
// получить из localStorage
let getState = function () {
	return JSON.parse(localStorage.getItem('todoData'));
};

let todoData =  [];

// рендер страницы
let render = function () {
	// очищаем строки todoLisElemt
	todoLisElemt.innerHTML = '';
	// очищаем строки todoCompletedElem
    todoCompletedElem.innerHTML = '';
    todoData.forEach(function (item, index) {
		// создаем элемент ли 
		let li = document.createElement('li');
		// присваеваем элементу ли класс todo-item
		li.classList.add('todo-item');
		// выводим в верстку элемент ли 
        li.innerHTML = 
		'<span class="text-todo">' + item.value + '</span> '+ 
		'<div class="todo-buttons">' +
		'<button  id="' + index + '"class="todo-remove"></button>' +
		'<button class="todo-complete"></button>'+
		'</div>';
		
		// если item.completed истина добовляеться элемент в выполненый списко туду 
        if (item.completed) {
            todoCompletedElem.append(li);
        } else {
			// если item.completed не истиа добовляеться элемент в не выполненый списко туду 
            todoLisElemt.append(li);
		}
		// смена статуса туду листа
        let todoCompleteBtn = li.querySelector('.todo-complete');
        todoCompleteBtn.addEventListener('click', function () {
			item.completed = !item.completed;
			setState();
            render();
		});
		// удаление одного из элементов туду листа
		let todoRemoveElem = li.querySelector('.todo-remove');
		todoRemoveElem.addEventListener('click', function () {
			todoData.splice(index, 1);
			setState();
			render();
		});
    });
};

// добавление нового туду листа
todoControlElem.addEventListener('submit', function (event) {
	//  отмена перезагрузки страницы
	event.preventDefault();
	// услвоие для не добовления пустых дел в туду лист
    if ( headerInputElem.value ) {
		//  в масив todoData пуш значение headerInputElem completed-не выполенный туду лист
        todoData.push({
            value: headerInputElem.value,
			completed: false,
			// id: todoData.length + 1
		});
		// очищение поле воода для туду листа после добовление их в сам туду лист 
		headerInputElem.value = '';
		// запуск функции 
		setState();
		render();
    }
});

// запуск функции 
render();

















































