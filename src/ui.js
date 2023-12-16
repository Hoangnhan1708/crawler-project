

class UI{
    render(conferences) {
        const ulElement = document.querySelector(".js-conferences-list")
        ulElement.innerHTML = '';
      
        if (conferences.length === 0) {
          ulElement.innerHTML = `<div class="no-item">We couldn't find the conference you need</div>`;
        } else {
          conferences.forEach((conference) => {
            ulElement.innerHTML += `
              <li class="conferences-item">
                <a href="${conference.URL}" class="conferences-item__title">${conference.Title}</a>
                <div class="conferences-item__time-vendor">
                  <p class="conferences-item__time">${conference.Time}</p>
                  <p class="conferences-item__vendor">${conference.Venue}</p>
                </div>
                <div class="conferences-item__des">${conference.DetailName}</div>
              </li>
            `;
          });
        }
      }
    async loadAllConferences(business) {
        try {
          const data = await business.loadAllConferences();
          this.render(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    async loadAllSearchedConferences(business,searchValue){
        const cateInput = document.querySelector("#search__category-select")
        const category = cateInput.value;
        console.log(searchValue)
      try {
        const data = await business.loadSearchedConferences(category, searchValue);
        this.render(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }

    
}

export default UI

