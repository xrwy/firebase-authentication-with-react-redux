import { configureStore } from '@reduxjs/toolkit';
import auth from './auth'

// store = mağaza demek, bu mağzaya ekleme
// yapabilirz, mağazandan ürün çıkartabiliriz


// reducer = Gelen action'nun tipine göre
// state'i değiştirecek işlemlerden sorumlu
// JavaScript fonksiyonudur.
// Birden fazla reducer olabilir.

// dispatch  = Action'ları context'e 
// göndermekle görevli bir JavaScript
// fonksiyonudur.


const store = configureStore({
    reducer:{
        auth
    }
})

export default store;