import { useState } from "react";
// import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import {ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
type ItemType = { num: number; role: string; photo: any };
// return photoData to requset backend

type PhotosT = string[]

export const usePhotoBoxes = (photos: PhotosT = []) => {


   let initState: ItemType[] = new Array(8).fill(0)
   initState[0] = { num: 1, role: `main`, photo: undefined }

   initState = initState.map(
      (d, idx) => (
         { num: idx + 1, role: d.role === `main` ? `main` : (photos[idx] ? "photo" : ""), photo: photos ? photos[idx] : undefined }
      )
   )

   initState = initState.map((d, idx) => ({
      ...d, role: idx !== 0 ? (initState[idx - 1].photo ? "main" : "") : d.role
   }))

   const [boxes, setBoxes] = useState<ItemType[]>(initState);
   const imageOption: any = {
      mediaType: 'photo',
      maxWidth: 700,
      maxHeight: 700,
      quality: 1,
      includeBase64: true,
    };
    
   
   const handlerAddPhoto = (arr: ItemType[], num: number) => {
      launchImageLibrary(
         imageOption,
         (response: ImagePickerResponse) => {
            /* console.log('Response = ', response); */

            if (response.didCancel) {
               console.log("User cancelled image picker");
            } else if (response.error) {
               console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
               console.log("User tapped custom button: ", response.customButton);
            } else {
              
               const newArr = arr.map((item, index) => {
                  if (index === num + 1) return { ...item, role: "main" };

                  if (index !== num) return item;

                  return { ...item, photo: 'data:image/jpeg;base64,' + response.base64, role: "photo" };
               });

               setBoxes(newArr);


            }
      
         });
   };

   const handlerDeletePhoto = (arr: ItemType[], num: number) => {
      // let newArr = arr.map((item, index: number) => {
      //    if (index === num) return { ...item, photo: null, role: "" };

      //    return item;
      // });

      // const main = newArr.filter((item) => item.role === "main");
      // const empty = newArr.filter((item) => item.role === "");
      // const photo = newArr.filter((item) => item.role === "photo");

      // const newArr1 = photo.concat(empty, main );

      // const delData = boxes.map((b, idx) => (idx === num + 1 ? { ...b, role: `` } : b))
      // setBoxes(delData.map((b, idx) => (idx === num ? { ...b, photo: undefined, role: `main` } : b)));


      const changed = [...boxes.filter((b, idx) => b.num !== num), { role: ``, photo: undefined, num }]

      let noMain = true

      

      changed.map(d => {
         if (d.role === `main` && !d.photo) {
            noMain = false
         }
      }
      )

      if (noMain) {
         changed[changed.length - 1] = { ...changed[changed.length - 1], role: `main` }
      }

      setBoxes(changed);
   };

   const sendPhoto = () => {

   }

   return {
      boxes,
      handlerAddPhoto,
      handlerDeletePhoto
   }
};
