import {addBooksHandler, showAllBooksHandler, editBooksByIdHandler, deleteBooksByIdHandler} from './handler.js'

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: showAllBooksHandler,
    },

    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: editBooksByIdHandler
    },

    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBooksByIdHandler
    }
]

export default routes