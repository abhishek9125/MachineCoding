import React, { useEffect, useState } from 'react';
import './styles.css';

function InfiniteScroll() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(1);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://dummyjson.com/products?limit=${page*10}`);
            const data = await res.json();
            setProducts(data);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.error("Error Fetching Products: ", error);
        } finally {
            setLoading(false);
        }
    }

    const myThrottle = (cb, d) => {
        let last = 0;
        return (...args) => {
            let now = new Date().getTime();
            if(now - last < d) return;
            last = now;
            return cb(...args);
        }
    }
    
    const handleScroll = myThrottle(() => {
        if(window.innerHeight + document.documentElement.scrollTop + 500 > document.documentElement.offsetHeight && !loading && products.limit < products.total) {
            fetchProducts();
        }
    }, 500)

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    useEffect(() => {
        fetchProducts();
    }, [])

    const { products: allProducts } = products;

    return (
        <div>
            <h1>InfiniteScroll</h1>
            <div className='products'>
            {
                allProducts?.map((prod) => {
                    return (
                        <div className='products__single' key={prod.id}>
                            <img src={prod.thumbnail} alt={prod.title} />
                            <span>{prod.title}</span>
                        </div>
                    )
                })
            }
            </div>
            {loading && <p>Loading....</p>}
        </div>
    )
}

export default InfiniteScroll