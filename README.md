
# Hack A Spot 🚗  
**A Smart Parking Spot Reservation System**  

Hack A Spot is an intelligent, location-based parking spot reservation system designed to simplify parking. Users can search for parking spots, view availability in real time, and reserve a spot based on location, time, and budget.

---

## 🔧 Tech Stack  
- **Frontend:** React.js  
- **Map Integration:** Leaflet.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB
- **Map Integration:** Leaflet.js  
- **API Requests:** Axios  
- **Version Control:** Git, GitHub  
- **Data Format:** JSON  
- **Development Tools:** Visual Studio Code  
- **Deployment:** Heroku  

---

## Haversine Distance Algorithm in Our Project
In our Parking Spot Reservation System, we use the Haversine Distance Algorithm to calculate the distance between the user's location and available parking spots. This helps us sort parking locations by proximity, ensuring users get the most relevant and nearest parking options.

Haversine Algorithm in JavaScript (Used in Our Project)
We implemented this in our Node.js backend to sort parking lots by distance dynamically:
  ```bash
      function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const toRad = (angle) => (angle * Math.PI) / 180; // Convert degrees to radians

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

## Why Haversine?
✅ Accurate: Takes Earth's curvature into account.
✅ Efficient: Uses simple trigonometric calculations, making it fast.
✅ Ideal for Location-Based Services: Perfect for sorting parking spots by distance.

---

## 🚀 Current Demo Features  
1. **Search Interface:** Users can input date, time, and budget to find parking spots.  
2. **Interactive Map:** Visualize parking lot locations using Leaflet.js.  
3. **Sorted Results:** Parking lots are displayed by proximity and total cost.  
4. **Detailed Directions:** Route guidance to the selected parking lot.  
5. **Real-Time Availability:** View parking slots (available/occupied) in a dynamic layout.  
6. **User-Friendly Design:** Clean, intuitive interface for seamless user experience.

---

## 🌟 Future Enhancements  
1. **Live Parking Updates Using CCTV Feeds**  
  - Integrate real-time *CCTV camera feeds* to detect available parking spots.  
  - Use *computer vision techniques (OpenCV, TensorFlow, or YOLO)* to process video streams and identify empty spaces automatically.

2. **Payment Integration**  
  - Allow users to *pay for parking directly* through the app via digital wallets or UPI.

3. **User Reviews & Ratings**  
  - Enable users to share feedback on parking spots to help others make informed decisions.

4. **AI-Powered Predictions**
  - Use machine learning to *predict parking spot availability* based on historical data and traffic trends.

---

## 🎥 Demo  
### Steps to Use the Project  
1. **Access the Demo Link:**  
  https://www.youtube.com/watch?v=6KUHrG7CseY
2. **Search for a Parking Spot:**  
   - Enter the **date, start and end time**, and budget.  
   - Click "Search" to view available parking lots.  
3. **Select a Parking Lot:**  
   - View detailed information like cost, distance, and available slots.  
   - See directions to the parking lot on the interactive map.  
4. **Reserve a Spot:**  
   - Drill down to view the lot layout and select a specific slot to reserve.  

---

## 🌐 Deploy Link  
https://hack-a-spot.biz/

---

## 🛠 Steps to Run Locally  
1. **Clone the Repository:**
Open your terminal and run:  
   ```bash
   git clone https://github.com/your-repo/hack-a-spot.git
   cd hack-a-spot/front-end
2. **Install Dependencies:**
Run the following command to install all the necessary dependencies:
   ```bash
   npm install
3. **Start the Development Server:**
Start the server by running:
   ```bash
   npm start
The app should be running on http://localhost:3000.

---

## 📧 Contact
For any queries, suggestions, or feedback, feel free to reach out to us:
- Email: sshevva@ncsu.edu
