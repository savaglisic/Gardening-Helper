from unittest import TestCase
from app import app, generate_prompt


class TestApp(TestCase):
    def test_generate_prompt(self):
        plant = "Cucumber"
        expected_prompt = """Provide the following one line details for the given plant.
    
    Plant name: Cucumber\n
    Plant name: Cucumber\n
    Scientific name: Cucumis sativus\n
    Flower type: Yellow\n
    Seed types: Monoecious or dioecious, depending on the cultivar\n
    Season type: Warm season crop\n
    Preferred soil type: Well-drained, fertile soil\n
    Preferred pH level: 6.0-7.0\n
    Preferred nutrition: Balanced fertilizer with more emphasis on nitrogen\n
    Harvest time: 50-70 days after sowing\n
    Plant compatibility: Avoid planting with aromatic herbs or nightshades.\n
    Plant: Cucumber"""

        actual_prompt = generate_prompt(plant)
        self.assertEqual(expected_prompt, actual_prompt)

