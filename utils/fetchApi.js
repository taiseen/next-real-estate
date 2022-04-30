import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

// this fetchApi() function call for data fetching from...
// 1)🟡 ../pages/index.js  
// 2)🟡 ../pages/search.js  
// 3)🟡 ../pages/property/[id].js
// 4)🟡 ../components/SearchFilters.js <Component />

// 🟢 SSG ==> getStaticProps() 
// call from index.js (fetch data at build time)

// 🟢 SSR ==> getServerSideProps() 
// call from search.js (fetch data at each request of user)
// call from /pages/property/[id].js (fetch data at each request of user)

export const fetchApi = async (url) => {

    // url ==> come from where this function is calling... 
    // for data fetching....
    
    const { data } = await axios.get(url, {
        headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        }
    });

    return data;
}