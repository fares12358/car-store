"use client";

import Image from "next/image";
import { SearchManufacture } from "./";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const SearchButton = ({ otherClasses }: { otherClasses: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain" />
    </button>
  )
}
const SearchBar = ({setManufacturer,setModel}:any) => {
  const router = useRouter();
  const [SearchManufacturer, setSearchManufacturer] = useState('');
  const [SearchModel, setSearchModel] = useState('');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (SearchManufacturer === '' && SearchModel === '') {
      return alert('please fill in the search bar')
    }

    setModel(SearchModel)
    setManufacturer(SearchManufacture)
  }

  // const updateSearchParams = (model: string, manufacture: string) => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   if (model) {
  //     searchParams.set('model', model)
  //   }
  //   else {
  //     searchParams.delete('model')
  //   }

  //   if (manufacture) {
  //     searchParams.set('manufacture', manufacture)
  //   }
  //   else {
  //     searchParams.delete('manufacture')
  //   }

  //   const newPathName = `${window.location.pathname}?${searchParams.toString()}`

  //   router.push(newPathName)
  // }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacture selected={SearchManufacturer} setSelected={setSearchManufacturer} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input type="text" name="model" value={SearchModel} onChange={(e) => { setSearchModel(e.target.value) }} placeholder="Tiguan" className="searchbar__input" />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar