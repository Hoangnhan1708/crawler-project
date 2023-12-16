


class Business {
    async loadAllConferences() {
      var conferences =[]
        try {
          const response = await fetch('http://localhost:3000/data'); //Here
          const data = await response.json();
          
          data.forEach((item) => {
            conferences.push(item)
          });
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        return conferences

    }

    async loadSearchedConferences(category,searchValue) {
      var conferences =[]
        try {
            const response = await fetch(`http://localhost:3000/search?category=${category}&term=${searchValue}`); //Here
            const data = await response.json();
            
            conferences.length = 0; // Clear existing conferences array
            data.forEach((item) => {
              conferences.push(item);
            });
        
            
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
        return conferences
        
    }
}
  
export default Business