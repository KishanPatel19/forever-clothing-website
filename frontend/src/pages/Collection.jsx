import React, { useContext, useEffect, useState } from "react";
import back from '../assets/back.png'
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
function Collection() {

  const {products} = useContext(ShopContext)
  const [showFilter, setShowFIlter] = useState(false);
  const [filterProducts,setFilterProducts]=useState([]);

  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);

  const toggleCategory =(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
  }
}

const toggleSubCategory =(e)=>{
  if(subCategory.includes(e.target.value)){
    setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
  }
  else{
    setSubCategory(prev=>[...prev,e.target.value])
  }
}

const applyFilter =()=>{
  let productsCopy = products.slice()
  if(category.length>0){
    productsCopy = productsCopy.filter(item=>category.includes(item.category))
  }
  if(subCategory.length>0){
    productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
  }
  setFilterProducts(productsCopy)
}



  useEffect(()=>{
    setFilterProducts(products);
  },[])
  useEffect(()=>{
    applyFilter()
  },[category,subCategory])

  return (
    <div className=" flex flex-col sm:flex-row border-t border-gray-300 pt-10 gap-1 sm:gap-10 ">
      {/* filter options */}
      <div className="min-w-60">
        <p onClick={()=>setShowFIlter(!showFilter)} className="text-xl  my-2 flex items-center gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90':''} `} src={back} alt="" />
        </p>
        <div
          className={`border pl-5 mt-6 py-3 border-gray-300 ${showFilter ? "" : "hidden"} sm:block `} >
          <p className="text-sm mb-3 font-medium">CATEGORIES</p>
          <div className="flex  gap-2 flex-col font-light text-gray-700 text-sm">
            <p className="flex  gap-2">
              <input type="checkbox" value={"Men"} onChange={toggleCategory} className="w-3" />
              Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} onChange={toggleCategory} className="w-3" />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        <div className={`border border-gray-300 my-5 pl-5 py-3 ${showFilter?'':'hidden'} sm:block`}>
          <p className="font-medium text-sm mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-gray-700 font-light text-sm ">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* product sort  */}
          <select className="border-2 border-gray-300 text-sm px-3 ">
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>
        {/* map products  */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {
          filterProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Collection;
