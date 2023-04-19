import unittest
from app import app


class TestApp(unittest.TestCase):
    def test_generate_prompt(self):
        plant = "cucumber"
        expected_prompt = """Provide the following one line details for the given plant.

  
    Plant name: Coconut\n
    Scientific name: Cocos nucifera\n
    Flower type: White\n
    Seed types: Monoecious \n
    Season type: Tropical\n
    Preferred soil type: Sandy, well-drained soil\n
    Preferred pH level: 5.5-7.5\n
    Preferred nutrition: Balanced fertilizer with emphasis on potassium and magnesium\n
    Harvest time: 8-12 months after flowering\n
    Plant compatibility: Avoid planting with other large trees.\n
    Plant: {}""".format(
            plant.capitalize()
        )
        actual_prompt = app.generate_prompt(plant)
        self.assertEqual(expected_prompt, actual_prompt)


if __name__ == '__main__':
    unittest.main()
