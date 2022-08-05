import { Field } from "multer";

export const possibleFiles: { [key: string]: ReadonlyArray<Field> } = { 
    services: [{ name: `image`, maxCount:1 }, { name: `price_list`, maxCount:1 }]
} 
const types: {
    [key: string]: {
        [key: string]: string
    }
} = { 
    gallery: { media: `image/video` },
    image: { forAll: `allow`, type: `image`  }
}


export default types; 
