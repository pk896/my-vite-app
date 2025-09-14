/* vite-fruidsData.js */

// Base class for fruits or products
/*class FruidsData {
    constructor({ id, Image, name, color, size, prize }) {
        this.id = id;
        this.Image = Image;
        this.name = name;
        this.color = color;
        this.size = size;
        this.prize = prize;
    }
}

// Extended class for clothing products
class Clothing extends FruidsData {
    constructor({ quality, made, manufacturer, type, ...rest }) {
        super(rest);
        this.quality = quality;
        this.made = made;
        this.manufacturer = manufacturer;
        this.type = type;
    }
}

// Raw data
const rawFruidsData = [
    {
        id: '29374pd384-29456fh410-4544',
        Image: '/src/data/vite-images/apples.jpeg',
        name: 'apple',
        color: 'red',
        size: 'large',
        prize: 2500
    }, {
        id: '52739er586-13456sj53-4933',
        Image: '/src/data/vite-images/banana.png',
        name: 'banana',
        color: 'yellow',
        size: 'large',
        prize: 5050
    }, {
        id: '15567kd765-89302ge421-3002',
        Image: '/src/data/vite-images/oranges.jpeg',
        name: 'orange',
        color: 'orange',
        size: 'medium',
        prize: 3000
    }, {
        id: '84426gsf28-384dgew3s8-5j39',
        Image: '/src/data/vite-images/fig.png',
        name: 'fig',
        color: 'gray',
        size: 'large',
        prize: 6500
    },
    // ... other clothing items
    {
        id: 'edf345-578dg-vdbjy86m-4f6j8m-00',
        Image: '/src/data/vite-clothes/6afffa33-03aa-4d03-8906-3a565e7e200e.webp',
        name: 'kd shoes',
        color: 'white, red, pink, black, cream-white',
        size: '4, 5, 6, 7, 8, 9',
        prize: 250000,
        quality: 'high',
        made: 'SA',
        manufacturer: 'Pk cl',
        type: 'clothes'
    }, {
        id: 'eh45jd8-dfghe-fvbv26902fjf-3rsn',
        Image: '/src/data/vite-clothes/bc8ef94e-ba75-41ab-bc75-461817fb131b.webp',
        name: 'lady charm w1',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 404000,
        quality: 'high',
        made: 'USA',
        manufacturer: 'OFs',
        type: 'clothes'
}, {
        id: 'sfhe46gj-g9gjg0dj-200cjs1d-j3f95f-fjg',
        Image: '/src/data/vite-clothes/d0d572cfe24c469f1dd1133f7c89d607_yf2hWQuFIyDuT.webp',
        name: 'smart flex dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 202000,
        quality: 'high',
        made: 'SA',
        manufacturer: 'USA',
        type: 'clothes'
},  {
        id: 'efhgrlglh-fmbcmb-38673v-cb35c-11',
        Image: '/src/data/vite-clothes/ae7d49c4baad4fad58b91db6d14cfde3.webp',
        name: 'excellecy high heal',
        color: 'white, purple, black, pink, navy, grey, brown',
        size: '4, 5, 6, 7, 8,9',
        prize: 265000,
        quality: 'high',
        made: 'UK',
        manufacturer: 'LGp',
        type: 'clothes'
},  {
        id: 'dgeh5-5547hf-rfsp08-eg35-88751w',
        Image: '/src/data/vite-clothes/327c318f-d6c8-4425-ad7b-20d280eef177.webp',
        name: 'queen she1 shoe',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 250000,
        quality: 'high',
        made: 'UK',
        manufacturer: 'Wg',
        type: 'clothes'
},  {
        id: 'dhghrg-dhghekgyt4-24688-vhe469v-dfhcddh45',
        Image: '/src/data/vite-clothes/9c7d294f-6016-4b3b-976a-8981d3db39a2.webp',
        name: 'baby-1 dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 195000,
        quality: 'high',
        made: 'USA',
        manufacturer: 'Uy',
        type: 'clothes'
},  {
        id: 'ehfhr537ffjg-588fjrv-vrffue-eghfhd-eg',
        Image: '/src/data/vite-clothes/d6641114-e8ee-46ca-9a98-cba145f850c6.webp',
        name: 'rounder fit dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 320000,
        quality: 'mediam',
        made: '',
        manufacturer: 'USA',
        type: 'clothes'
}, {
        id: '3ff4fg689j-897h-5h5j8-4fcd3bu8',
        Image: '/src/data/vite-clothes/6ffb8f01-b3e6-4528-a853-23d98b23b263.webp',
        name: 'rw-boets 422E',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 359000,
        quality: 'mediam',
        made: 'UK',
        manufacturer: 'SHGD',
        type: 'clothes'
}, {
        id: 'kju93-ukjh-jgrgjr-fhdhbb-fd36f4',
        Image: '/src/data/vite-clothes/c1953a755088080ddc34bfe54a12b3eb.webp',
        name: 'black heal 422E',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 390000,
        quality: 'mediam',
        made: 'USA',
        manufacturer: 'IK if',
        type: 'clothes'
} 
    
];

// Convert raw data to class instances
export const fruidsData = rawFruidsData.map(item =>
    item.type === 'clothes' ? new Clothing(item) : new FruidsData(item)
);

// Helper function to get product by ID
export function getFruidsById(fruidsId) {
    return fruidsData.find(item => item.id === fruidsId) || null;
}*/







/*class FruidsData {
        id;
        Image;
        name;
        color;
        size;
        prize;

        constructor(fruidsDetails) {
                this.id = fruidsDetails.id;
                this.Image = fruidsDetails.Image;
                this.name = fruidsDetails.name;
                this.color = fruidsDetails.color;
                this.size = fruidsDetails.size;
                this.prize = fruidsDetails.prize
        }


};

        
class Clothing extends FruidsData {
        
        quality;
        made;
        manufacturer;
        type;

                constructor(fruidsDetails) {
                        super(fruidsDetails)
                        this.quality = fruidsDetails.quality;
                        this.made = fruidsDetails.made;
                        this.manufacturer = fruidsDetails.manufacturer;
                        this.type = fruidsDetails.type;

                }
        };


        console.log(Clothing);

export const fruidsData = [ {
        id: 'eh45jd8-dfghe-fvbv26902fjf-3rsn',
        Image: '/src/data/vite-clothes/bc8ef94e-ba75-41ab-bc75-461817fb131b.webp',
        name: 'lady charm w1',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 404000,
        quality: 'high',
        made: 'USA',
        manufacturer: 'OFs',
        type: 'clothes'
}, {
        id: 'sfhe46gj-g9gjg0dj-200cjs1d-j3f95f-fjg',
        Image: '/src/data/vite-clothes/d0d572cfe24c469f1dd1133f7c89d607_yf2hWQuFIyDuT.webp',
        name: 'smart flex dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 202000,
        quality: 'high',
        made: 'SA',
        manufacturer: 'USA',
        type: 'clothes'
},  {
        id: 'efhgrlglh-fmbcmb-38673v-cb35c-11',
        Image: '/src/data/vite-clothes/ae7d49c4baad4fad58b91db6d14cfde3.webp',
        name: 'excellecy high heal',
        color: 'white, purple, black, pink, navy, grey, brown',
        size: '4, 5, 6, 7, 8,9',
        prize: 265000,
        quality: 'high',
        made: 'UK',
        manufacturer: 'LGp',
        type: 'clothes'
},  {
        id: 'dgeh5-5547hf-rfsp08-eg35-88751w',
        Image: '/src/data/vite-clothes/327c318f-d6c8-4425-ad7b-20d280eef177.webp',
        name: 'queen she1 shoe',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 250000,
        quality: 'high',
        made: 'UK',
        manufacturer: 'Wg',
        type: 'clothes'
},  {
        id: 'dhghrg-dhghekgyt4-24688-vhe469v-dfhcddh45',
        Image: '/src/data/vite-clothes/9c7d294f-6016-4b3b-976a-8981d3db39a2.webp',
        name: 'baby-1 dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 195000,
        quality: 'high',
        made: 'USA',
        manufacturer: 'Uy',
        type: 'clothes'
},  {
        id: 'ehfhr537ffjg-588fjrv-vrffue-eghfhd-eg',
        Image: '/src/data/vite-clothes/d6641114-e8ee-46ca-9a98-cba145f850c6.webp',
        name: 'rounder fit dress',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 320000,
        quality: 'mediam',
        made: '',
        manufacturer: 'USA',
        type: 'clothes'
}, {
        id: '3ff4fg689j-897h-5h5j8-4fcd3bu8',
        Image: '/src/data/vite-clothes/6ffb8f01-b3e6-4528-a853-23d98b23b263.webp',
        name: 'rw-boets 422E',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 359000,
        quality: 'mediam',
        made: 'UK',
        manufacturer: 'SHGD',
        type: 'clothes'
}, {
        id: 'kju93-ukjh-jgrgjr-fhdhbb-fd36f4',
        Image: '/src/data/vite-clothes/c1953a755088080ddc34bfe54a12b3eb.webp',
        name: 'black heal 422E',
        color: 'white, purple, black, pink, navy, grey',
        size: '4, 5, 6, 7, 8,9',
        prize: 390000,
        quality: 'mediam',
        made: 'USA',
        manufacturer: 'IK if',
        type: 'clothes'
}     
].map((fruidsDetails) => {
        if (fruidsDetails.type === 'clothes') {
                return new Clothing(fruidsDetails)
        };
        return new FruidsData(fruidsDetails);
})



export function getFruidsById(fruidsId) {
        let matchingItem = {};
        fruidsData.forEach((fruid) => {
                if (fruid.id === fruidsId) {
                matchingItem = fruid;
                }
        });
        return matchingItem;
}*/

/*fruidsData = fetch('https//supersimplebackend.dev/hello').then((response) => {
        return response.json();
}).then((data) => {
        console.log(data);
}).catch((error) => {
        console.error('Error fetching data:', error);
})*/
