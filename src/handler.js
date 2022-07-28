import books from './books.js'
import { nanoid } from 'nanoid'

const addBooksHandler = (request,h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = readPage == pageCount ? true : false

    const addBooks = {
        id,name,year,author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt
    };

    const isFailedName = addBooks.name == undefined || addBooks.name === '' || !addBooks.name

    const isFailedPage = addBooks.readPage > addBooks.pageCount
    
    const isSuccess = !isFailedName && !isFailedPage
    
    if(isFailedName){

        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }
    
    else if (isFailedPage){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response
    }
    
    else if(isSuccess) {
        books.push(addBooks)
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201)
        return response
    }
    
    else {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        });
        response.code(500)
        return response
    }

    
}

const showAllBooksHandler = (request,h) => ({
    status: 'success',
    data: {
        books : books.map((book) =>({'id': book.id, 'name': book.name, 'publisher' : book.publisher}))
    }
})

const showDetailBooksHandler = (request,h) => {
    const {bookId} = request.params
    const book = books.filter((n) => n.id === bookId)[0]

    if (book !== undefined){
        return {
            status: 'success',
            data: {
                book
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    })
    response.code(404)
    return response
}

const editBooksByIdHandler = (request,h) => {
    const{bookId} = request.params

    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload
    const updatedAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === bookId)
    const isFailedName = name === undefined || name === '' || !name
    const isFailedPage = readPage > pageCount
    const indexNegatif = index !== -1
    const isSuccess = indexNegatif && !isFailedName && !isFailedPage

    if(isFailedName){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        response.code(400)
        return response

    } else if(isFailedPage){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response

    } else if(isSuccess){

        books[index] = {
            ...books[index],name,year,author,summary,publisher,pageCount,readPage,reading,updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteBooksByIdHandler = (request,h) => {
    const {bookId} = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if(index !== -1){
        books.splice(index,1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

export {addBooksHandler, showAllBooksHandler, showDetailBooksHandler, editBooksByIdHandler, deleteBooksByIdHandler}