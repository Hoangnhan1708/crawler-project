


class Business {
    // Khai báo async để sử dụng await bên trong
    async loadAllConferences() {
      var conferences =[]
        try {
          // Khi gọi await thì đoạn code phía sẽ trở thành 1 Promise, chờ đến khi Promise đc
          // resolve thì tiếp tục run
          const response = await fetch('http://localhost:3000/data'); 
          const data = await response.json();
          
          data.forEach((item) => {
            conferences.push(item)
          });
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        return conferences

    }

    // Khai báo async để sử dụng await bên trong
    async loadSearchedConferences(category,searchValue) {
      var conferences =[]
        try {
          // Khi gọi await thì đoạn code phía sẽ trở thành 1 Promise, chờ đến khi Promise đc
          // resolve thì tiếp tục run
            const response = await fetch(`http://localhost:3000/search?category=${category}&term=${searchValue}`); 
            const data = await response.json();
            
            
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