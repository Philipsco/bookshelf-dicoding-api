import books from './books.js'
import { nanoid } from 'nanoid'


const addBooksHandler = (request,h) => {
    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updateAt = createdAt
    const finished = false

    const addBooks = {
        name,year,author,summary,publisher,pageCount,readPage,reading,id,finished,insertedAt,updateAt
    };

    books.push(addBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0
    const isFailedName = books.filter((book) => book.name != name)

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201)
        return response

    } else if (isFailedName){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        response.code(400)
        return response
    } 
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500)
    return response
}

const showAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    }
})

const showDetailBooksHandler = () => {
    const {id} = request.params;

    const books = books.filter((n) => n.id ===id)[0];

    if (books !== undefined){
        return {
            status: 'success',
            data: {
                books
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
}

const editBooksByIdHandler = (request,h) => {
    const{id} = request.params;

    const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload
    const updatedAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === id)
    const isFailedName = books.filter((book) => book.name != name)
    const isFailedPage = books.filter((book) => book.readPage > book.pageCount)

    if(index !== -1){
        books[index] = {
            ...books[index],name,year,author,summary,publisher,pageCount,readPage,reading,updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else if(isFailedName){
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
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteBooksByIdHandler = (request,h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id === id);

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