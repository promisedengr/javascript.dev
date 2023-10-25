import React, { useState } from 'react';

export const useSelect = (arr: any) => {
   const [array, setArr] = useState(arr);


   const select = (id: any) => {
      let newArr = array.map((item: any) => {
         if (item.id !== id) return item
         return { ...item, picked: !item.picked }
      })
      setArr(newArr);
   };

   const selectOne = (index: string) => {
     // console.log()
      //console.log(index)
      const newArr = array.map((a: any, idx: number) => ({ ...a, picked: +index === idx }))
      setArr(newArr)
   }

   const setArray = (arr: any) => setArr(arr)

   return {
      array,
      select,
      selectOne,
      setArray
   }
}