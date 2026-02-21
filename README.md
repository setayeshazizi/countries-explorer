 🌍Countries Explorer 

A small, interactive React app that lets you explore countries from around the world. You can search by name, filter by region, sort by population, and see a live “loading” state while data is being fetched.  


 Features
- Search countries by name with a smooth debounced input  
- Filter countries by region: Africa, Americas, Asia, Europe, Oceania  
- Sort countries by population (smallest → largest or largest → smallest)  
- Loading skeleton while data is fetching  
- No results message when no countries match your search  
- Clear filters button to reset search, region, and sorting  

Bonus: Handles missing data gracefully (some countries might not have all fields)  



Screenshots

Home Page  
![Home Page](screenshots/home.png)
![Home Page](screenshots/home2.png)

Search/Filtered Result  
![Search Result](screenshots/search.png)
![Search Result](screenshots/search2.png)
![Search Result](screenshots/search3.png)


API Endpoints Used
- All countries: https://restcountries.com/v3.1/all  
- Search by name: https://restcountries.com/v3.1/name/{name}  
- Filter by region: https://restcountries.com/v3.1/region/{region}  


 How to Run
1. Clone the repo:  
```bash
git clone <your-repo-link>
