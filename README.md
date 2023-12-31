# Требования к приложению "Онлайн маркет"

## Обзор

Онлайн маркет - это одностраничное веб-приложение, в котором пользователи могут покупать товары и выбирать между вариантами самовывоза и доставки. Приложение имеет минималистичный дизайн, цветовую палитру которого вдохновлено национальными цветами Китая (красный, белый, черный и золотой).

## Детали приложения

* Приложение представляет список из пяти товаров на продажу, каждый с отдельной видимой для пользователя ценой.
* Пользователи могут выбирать количество каждого товара, минимум - 0, максимум - 999.
* Общая сумма корзины пользователя динамически рассчитывается и отображается.
* Выпадающее меню позволяет пользователям выбирать между вариантами самовывоза и доставки. Кнопка "Завершить заказ" остается неактивной до выбора одного из вариантов.
* Если выбран вариант доставки, отображается поле адреса для заполнения пользователем. Заказ можно завершить только после ввода адреса.
* Прошлые заказы перечислены в нижней части страницы. Каждая запись о заказе отображает заказанные товары, количество каждого товара, дату заказа и адрес доставки (если применимо).
* Всплывающее окно появится, когда общая цена превысит 300 и будет выбран вариант самовывоза, предлагая пользователю бесплатную доставку. Если пользователь соглашается, вариант доставки автоматически обновляется.

Приложение реализовано с использованием HTML, CSS и JavaScript и поддерживает высокий стандарт качества кода.
