29 - Apr - 2022

## Real-Estate App | [Live Link](www)

# Next-Js + Chakra-UI

## Learning Context:
|No| Context learn by doing this project...                         | 
|--|----------------------------------------------------------------|
| 1| Dynamic Routing                                                | 
| 2| File Base Routing                                              | 
| 3| Layout Architecture                                            | 
| 4| Fetching data from `Rapidapi`                                  | 
| 5| API calling by the help of `Axios`                             | 
| 6| Looping through Select + options                               | 
| 7| Image Scrollbar for displaying images                          | 
| 8| UI building by Chakra-UI CSS framework                         | 
| 9| Displaying `Progress Bar` when new page opening...             | 
|10| use millify() + toLocaleString() for human readable number.    |
|11| `SSG` ==> Static Site Generation ( fetch data at `build time`) | 
|12| `SSR` ==> Server Side Rendering ( fetch data at `each request`)| 
|13| `dangerouslySetInnerHTML={{__html: data}}` by self closing tag | 


# Needful Dependencies | Yarn
|No| Package Installs           | Usage of                                                |
|--|----------------------------|---------------------------------------------------------|
| 1| yarn add `axios`           | Promise based HTTP client | api request                 |
| 2| yarn add `millify`         | Converts long numbers to pretty, human-readable strings |
| 3| yarn add `nprogress`       | Simple slim progress bars                               |
| 4| yarn add `framer-motion`   | React animation library                                 |
| 5| yarn add `@emotion/react`  | Simple styling in React                                 |
| 6| yarn add `@emotion/styled` | Styled API for emotion                                  |
| 7| yarn add `@chakra-ui/react`| Responsive UI components built with React & Emotion     |
| 8| yarn add `react-icons`     | SVG React icons of popular icon packs using ES6 imports |
| 9| yarn add `react-horizontal-scrolling-menu` | component for React, support mouse & touch devices |


# Data Source form [Rapid-api](https://rapidapi.com/apidojo/api/bayut)


```jsx
import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
   
    const { data } = await axios.get(url, {
        headers: {
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        }
    });

    return data;
}
```

# Real Estate | App Demo

<img src='https://i.ibb.co/bb6RjHF/Next-Real-Estate.jpg' />

Learn by inspired from[.](https://youtu.be/y47gYvXchXM)
