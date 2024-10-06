import { carProps, FilterProps } from "@/app/Types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export async function fetchCars(filters: FilterProps) {
  try {
    const { manufacturer, year, model, limit, fuel } = filters;
    const url = `https://api.api-ninjas.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'rh1L1BB5FpazCFqIUNxxCQ==Idk3bmPJD1nclXw9',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return null;
  }
}

export const generateCarImageUrl = (car: carProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, year, model } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value)
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`
  return newPathName;
}