package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"log"

	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	//"strconv"
	"strings"
	//"time"
	//"github.com/tarm/serial"
)

type Plant struct {
	CommonName     string `json:"common_name"`
	Slug           string `json:"slug"`
	ScientificName string `json:"scientific_name"`
	Description    string `json:"description"`
	Rank           string `json:"rank"`
	Vegetable      bool   `json:"vegetable"`
	Genus          string `json:"genus"`
	Family         string `json:"family"`
}

// PlantsResponse is a struct that represents the response from the Trefle API
type PlantsResponse struct {
	Data []Plant `json:"data"`
}

// Garden map to store plants
var Garden map[string]Plant

func init() {
	Garden = make(map[string]Plant)
}

func main() {
	for {
		fmt.Println()
		fmt.Println("Welcome to the Plant Database")

		fmt.Println()
		fmt.Println("1. Search for a plant")
		fmt.Println("2. Add a plant to the garden")
		fmt.Println("3. Edit a plant in the garden")
		fmt.Println("4. View my plants")
		fmt.Println("5. Would you like to plant veggies in the garden? ")
		fmt.Println("6. Plant tracker")
		fmt.Println("7. Would you like to see a list of the plants you are currently tracking?  ")
		fmt.Println("8. Purchase seeds and garden products")
		fmt.Println("9. Exit")
		fmt.Println()

		fmt.Print("Enter your choice: ")

		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		input = strings.TrimSpace(input)

		switch input {
		case "1":
			searchPlant()
		case "2":
			addPlant()
		case "3":
			editPlant()
		case "4":
			viewMyPlants()
		case "5":
			vegetablePlant()
		case "6":
			plantTracker()

		case "7":
			viewTrackPlants()
		case "8":
			purchaseProducts()
		case "9":
			fmt.Println()
			fmt.Println("Thank you for taking the time to search through 100,000 plants to find the one you were looking for!")
			fmt.Println()

			return
		default:
			fmt.Println("Invalid choice. Try again.")
			fmt.Println()
		}
	}
}

func searchPlant() {
	fmt.Println()
	fmt.Print("Enter plant name: ")

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)

	// Build the URL to fetch information from the Trefle API
	url := fmt.Sprintf("https://trefle.io/api/v1/plants/search?q=%s&token=eX8zkmOMqHh9Web_qr5vv917_0l2xkkWXo_oxq4wT4s", input)

	response, err := http.Get(url)
	if err != nil {
		fmt.Println("Error fetching data from Trefle API:", err)
		return
	}
	defer response.Body.Close()

	// Check if the status code is in the 200s range
	if response.StatusCode < 200 || response.StatusCode >= 300 {
		fmt.Printf("Error: Got status code %d from Trefle API\n", response.StatusCode)
		return
	}

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		return
	}

	var plantsResponse PlantsResponse
	err = json.Unmarshal(body, &plantsResponse)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}
	// Check if there are any plants in the response
	if len(plantsResponse.Data) == 0 {
		fmt.Println("No plants found for the given name.")
		return
	}

	// Print the first plant in the response
	plant := plantsResponse.Data[0]
	fmt.Printf("\nPlant\n")
	fmt.Println("--------------")
	fmt.Printf("Common Name: %s\n", plant.CommonName)
	fmt.Printf("Scientific Name: %s\n", plant.ScientificName)
	fmt.Printf("Slug: %s\n", plant.Slug)
	fmt.Printf("Rank: %s\n", plant.Rank)
	fmt.Println("Genus: ", plant.Genus)
	fmt.Println("Family common name: ", plant.Family)
	fmt.Printf("Is Vegetable: %t\n", plant.Vegetable)
	fmt.Println()

	// Prompt the user to add the plant to their garden
	fmt.Println()
	fmt.Print("Would you like to add this plant to your garden? (yes/no)")
	bufio.NewReader(os.Stdin)
	addPlantChoice, _ := reader.ReadString('\n')
	addPlantChoice = strings.TrimSpace(addPlantChoice)

	if addPlantChoice == "yes" {
		fmt.Println()
		fmt.Println("Enter the common name of the plant you would like to add:")
		reader := bufio.NewReader(os.Stdin)
		selectedPlantName, _ := reader.ReadString('\n')
		selectedPlantName = strings.TrimSpace(selectedPlantName)

		if plant.CommonName == selectedPlantName {
			// Save the plant to the file
			if err := savePlant(plant); err != nil {
				fmt.Println("Error saving plant:", err)
				return
			}

			// Add the plant to the garden map
			Garden[plant.CommonName] = Plant{
				CommonName:  plant.CommonName,
				Description: plant.Description,
			}
			fmt.Println("Plant added to the garden successfully!")
		} else {
			fmt.Println("Plant not found.")
		}

	} else {

		fmt.Println("Thank you for taking the time to search for the perfect plant, and We hope you have found the one you were searching for!  ")
		fmt.Println()

	}

}
func addPlant() {
	fmt.Println()
	fmt.Print("Enter plant name: ")
	reader := bufio.NewReader(os.Stdin)
	name, _ := reader.ReadString('\n')
	name = strings.TrimSpace(name)

	fmt.Print("Enter plant description: ")

	var description strings.Builder
	for {
		line, _ := reader.ReadString('\n')
		line = strings.TrimSpace(line)
		if line == "." {
			break
		}
		description.WriteString(line + "\n")
	}

	Garden[name] = Plant{
		CommonName:  name,
		Description: description.String(),
	}

	fmt.Println()
	fmt.Println("Plant added to the garden successfully!")
	fmt.Println()

}

func editPlant() {
	fmt.Print("Enter the name of the plant you want to edit: ")
	reader := bufio.NewReader(os.Stdin)
	name, _ := reader.ReadString('\n')
	name = strings.TrimSpace(name)

	plant, found := Garden[name]
	if !found {
		fmt.Println("Plant not found.")
		return
	}

	fmt.Print("Enter new description (press enter after each line, type '.' on a new line to stop):\n")
	var descriptionLines []string
	for {
		reader = bufio.NewReader(os.Stdin)
		descriptionLine, _ := reader.ReadString('\n')
		descriptionLine = strings.TrimSpace(descriptionLine)

		if descriptionLine == "." {
			break
		}

		descriptionLines = append(descriptionLines, descriptionLine)
	}

	plant.Description = strings.Join(descriptionLines, "\n")
	Garden[name] = plant

	fmt.Println()
	fmt.Println("Plant description updated successfully!")
	fmt.Println()
}

func vegetablePlant() {
	// Read the CSV file
	file, err := os.Open("vegetables.csv")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error reading CSV data:", err)
		return
	}

	scanner := bufio.NewScanner(os.Stdin)

	for {
		// Ask the user for a vegetable to search for
		fmt.Print("Enter a vegetable to search for (or 'q' to quit): ")
		if !scanner.Scan() {
			return
		}
		searchTerm := scanner.Text()

		if searchTerm == "q" {
			break
		}

		// Search the records for a match
		found := false
		for _, record := range records {
			if strings.ToLower(record[0]) == strings.ToLower(searchTerm) {
				fmt.Println("Name:", record[0])
				fmt.Println("Ideal Temperature for the plant:", record[1])
				fmt.Println("PH:", record[2])
				fmt.Println("Soil: ", record[3])
				fmt.Println("Waterlevel: ", record[4])
				fmt.Println("Space: ", record[5])

				found = true
				break
			}
		}

		if !found {
			fmt.Println("Sorry, the vegetable you entered was not found in the database.")
		}
	}
}

func savePlant(plant Plant) error {
	// Open the file for appending
	file, err := os.OpenFile("garden.json", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	// Encode the plant as JSON and write it to the file
	encoder := json.NewEncoder(file)
	if err := encoder.Encode(plant); err != nil {
		return err
	}

	return nil
}

func retrieveMyPlants() ([]Plant, error) {
	var plants []Plant

	// Open the file for reading
	file, err := os.Open("garden.json")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Decode the file contents as JSON and append the plants to the slice
	decoder := json.NewDecoder(file)
	for decoder.More() {
		var plant Plant
		if err := decoder.Decode(&plant); err != nil {
			return nil, err
		}
		plants = append(plants, plant)
	}

	return plants, nil
}

func viewMyPlants() {
	// Retrieve all plants added by the current user from the database or file
	myPlants, err := retrieveMyPlants()
	if err != nil {
		fmt.Println("Error retrieving plants:", err)
		return
	}

	if len(myPlants) == 0 {
		fmt.Println("You haven't added any plants yet.")
	} else {
		fmt.Println("Your plants:")
		for _, plant := range myPlants {
			//fmt.Printf("- %s (%s):\n", plant.Name, plant.Species)
			fmt.Printf("  Common name: %s\n", plant.CommonName)
			fmt.Printf("  Slug: %s\n", plant.Slug)
			fmt.Printf("  Scientific name: %s\n", plant.ScientificName)
			fmt.Printf("  Description: %s\n", plant.Description)
			fmt.Printf("  Genus: %s\n", plant.Genus)
			fmt.Printf("  Family common name: %s\n", plant.Family)
			fmt.Printf("  Is vegetable: %t\n", plant.Vegetable)
			fmt.Printf("  Rank: %s\n", plant.Rank)
			//	fmt.Printf("  Observation: %s\n", plant.Observation)
			fmt.Println()
		}
	}
}

func plantTracker() {
	fmt.Println("Welcome to the Plant Tracker")

	// Prompt user to enter plant name
	fmt.Print("Enter the name of the plant you want to track: ")
	reader := bufio.NewReader(os.Stdin)
	plantName, _ := reader.ReadString('\n')
	plantName = strings.TrimSpace(plantName)

	// Check if the user wants to remove the plant
	fmt.Print("Do you want to remove the plant from your tracking? (y/n): ")
	removePlant, _ := reader.ReadString('\n')
	removePlant = strings.TrimSpace(removePlant)

	if removePlant == "y" {
		fileName := plantName + ".txt"
		if err := os.Remove(fileName); err != nil {
			fmt.Println("Failed to remove plant:", err)
			return
		}
		fmt.Println("Plant removed successfully!")
		return
	}

	// Prompt user to enter plant progress
	fmt.Print("Enter the progress of your plant: ")
	plantProgress, _ := reader.ReadString('\n')
	plantProgress = strings.TrimSpace(plantProgress)

	// Prompt user to upload an image of the plant
	fmt.Print("Do you want to upload an image of your plant? (y/n): ")
	uploadImage, _ := reader.ReadString('\n')
	uploadImage = strings.TrimSpace(uploadImage)

	var imagePath string
	if uploadImage == "y" {
		fmt.Print("Enter the path to the image: ")
		imagePath, _ = reader.ReadString('\n')
		imagePath = strings.TrimSpace(imagePath)
	}

	// Prompt user to add notes about the plant
	fmt.Print("Do you want to add any notes about your plant? (y/n): ")
	addNotes, _ := reader.ReadString('\n')
	addNotes = strings.TrimSpace(addNotes)

	var notes string
	if addNotes == "y" {
		fmt.Print("Enter your notes: ")
		notes, _ = reader.ReadString('\n')
		notes = strings.TrimSpace(notes)
	}

	// Save plant information to a file
	fileName := plantName + ".txt"
	file, err := os.Create(fileName)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	fmt.Fprintln(file, "Plant Name:", plantName)
	fmt.Fprintln(file, "Plant Progress:", plantProgress)

	if uploadImage == "y" {
		fmt.Fprintln(file, "Image Path:", imagePath)
	}

	if addNotes == "y" {
		fmt.Fprintln(file, "Notes:", notes)
	}

	fmt.Println("Plant added successfully!")
}

func viewTrackPlants() {
	files, err := ioutil.ReadDir(".")
	if err != nil {
		log.Fatal(err)
	}

	var plantFiles []string
	for _, file := range files {
		if strings.HasSuffix(file.Name(), ".txt") {
			plantFiles = append(plantFiles, file.Name())
		}
	}

	if len(plantFiles) == 0 {
		fmt.Println("You haven't added any plants yet.")
		reader := bufio.NewReader(os.Stdin)
		fmt.Print("Do you want to add a plant to track? (y/n): ")
		addPlant, _ := reader.ReadString('\n')
		addPlant = strings.TrimSpace(addPlant)

		if addPlant == "y" {
			plantTracker()
			fmt.Println("Plant added successfully!")
		} else {
			fmt.Println("No plants to display.")
		}
	} else {
		for _, file := range plantFiles {
			fmt.Println("===============================")
			fmt.Println("Plant Details for:", strings.TrimSuffix(file, ".txt"))

			data, err := ioutil.ReadFile(file)
			if err != nil {
				log.Fatal(err)
			}

			fmt.Print(string(data))
			fmt.Println("===============================")
		}
	}
}

func purchaseProducts() {
	fmt.Println("What do you want to purchase?")
	fmt.Println("1. Seeds")
	fmt.Println("2. Fertilizers")
	fmt.Println("3. Garden tools")
	//fmt.Println("4. Other products")

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)

	switch input {
	case "1":
		fmt.Println("Here are some links to purchase seeds:")
		fmt.Println("Burpee: https://www.burpee.com/")
		fmt.Println("Johnny's Selected Seeds: https://www.johnnyseeds.com/")
		fmt.Println("Seed Savers Exchange: https://www.seedsavers.org/")
		fmt.Println("Baker Creek Heirloom Seeds: https://www.rareseeds.com/")
		fmt.Println("Park Seed: https://parkseed.com/")

	case "2":
		fmt.Println("Here are some links to purchase fertilizers:")
		fmt.Println("Home Depot: https://www.homedepot.com/b/Outdoors-Garden-Center-Plant-Care-Fertilizers/N-5yc1vZbx6k")
		fmt.Println("Lowe's:https://www.lowes.com/pl/Lawn-fertilizer-Lawn-care-Lawn-garden/2610376442062?cm_mmc=src-_-c-_-prd-_-lwn-_-ggl-_-B_LWN_107_Fertilizer-_-lowe%27s%20garden%20fertilizer-_-0-_-0-_-0&ds_rl=1286981&gclid=CjwKCAjw_MqgBhAGEiwAnYOAej7G8i7vzeYLKeKTIv9a_NtLRhe9WiJJ2denEEQAHG2bNxwoqbf09BoCXm4QAvD_BwE&gclsrc=aw.ds")
		fmt.Println("Ace Hardware:https://www.acehardware.com/departments/lawn-and-garden/gardening/flower-and-plant-fertilizer")

	case "3":
		fmt.Println("Here are some links to purchase garden tools:")
		fmt.Println("Home Depot: https://www.homedepot.com/b/Outdoors-Garden-Center-Garden-Tools/N-5yc1vZc5r5")
		fmt.Println("Lowe's: https://www.lowes.com/c/Lawn-garden-hand-tools-Outdoor-tools-equipment-Outdoors?cm_mmc=src-_-c-_-prd-_-sol-_-ggl-_-B_SOL_242_Tools-Watering-Storage-Sheds-_-lowe%27s%20garden%20tool-_-0-_-0-_-0&ds_rl=1286981&gclid=CjwKCAjw_MqgBhAGEiwAnYOAekiryeemRNGXJEffwi54w3cuckgfS70WJzl0ETUouzL7KXdyCcV9RBoCmlMQAvD_BwE&gclsrc=aw.ds")
		fmt.Println("Amazon:https://www.amazon.com/s?k=gardening+tools&crid=1GNS82V0SB0KF&sprefix=gardening+tool%2Caps%2C158&ref=nb_sb_noss_1")
		// case "4":
		//  fmt.Println("Here are some links to purchase other garden products:")
		// Insert relevant links here
	default:
		fmt.Println("Invalid choice. Try again.")
	}
}
