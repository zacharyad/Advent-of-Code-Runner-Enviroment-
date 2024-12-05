# 🎄 Advent of Code Runner Enviroment 🎅

> **A streamlined Node.js app for tackling Advent of Code challenges with ease!**  
> Organize your solutions, manage input data, and run the latest challenge effortlessly.

---

## 🌟 What is Advent of Code?

[Advent of Code](https://adventofcode.com/) is a yearly coding event that brings joy (and maybe a little frustration 😅) to developers everywhere! Starting December 1st, a new puzzle drops every day, testing your algorithmic skills and creativity. 

🎁 **Why Join?**  
- **Daily Challenges:** Solve progressively harder puzzles each day.  
- **Skill Building:** Improve your problem-solving, algorithms, and coding chops.  
- **Fun Twists:** Each day’s puzzle has two parts—the second is always a surprise!  
- **Community Vibes:** Join thousands of devs sharing solutions and competing on leaderboards.  

---

## 🚀 App Overview

This app is your **Advent of Code companion**! It creates the files you need, organizes your input data, and ensures the latest challenge is just one command away.

### ✨ Features:
- **Automatic Setup:** Quickly create solution files for each challenge (`01.js`, `02.js`, ...).  
- **Input Data Management:** Organize your input files (`data01.txt`, `data02.txt`, ...).  
- **Run with Ease:** Simply run the latest challenge using `npm test`.  

---

## 📦 Setup and Requirements

### Prerequisites:
- **Node.js** installed (v14 or later recommended).  
- Familiarity with JavaScript and your terminal of choice.

### Installation:
1. Clone this repository: 
   1. SSH: git@github.com:zacharyad/Advent-of-Code-Runner-Enviroment-.git
   2. HTTP: https://github.com/zacharyad/Advent-of-Code-Runner-Enviroment-.git


### 🛠️ Usage

📝 Creating Challenge Files
Each challenge corresponds to a day in December. To get started:

Navigate to the days folder.
Create a new .js file in the format 01.js, 02.js, ..., where the number matches the challenge day.
Example:

Day 1: Create days/01.js
Day 15: Create days/15.js

### 📂 Adding Input Data
Every challenge includes input data, which should be saved in the data folder. Use the format data01.txt, data02.txt, ..., again matching the challenge day.

Example:

Day 1: Create data/data01.txt
Day 15: Create data/data15.txt

💡 Tip: Paste the challenge input directly into the respective file.

### ▶️ Running the App
When you're ready to test your solution:
```
npm test
```
#### 🚨 What happens?

The app automatically detects the latest .js file in the days folder.
It runs the file and handles the corresponding input from the data folder.

#### 🖥️ Output:
Results (standard output and errors) will appear in your terminal. 🎉

### 🔍 How It Works

#### File Organization:
- Solutions: Saved in the days folder as 01.js, 02.js, ...
- Input Data: Stored in the data folder as data01.txt, data02.txt, ...
- Auto-Run Logic: The app dynamically identifies the most recent .js file in days and executes it. It pairs this with the corresponding data file, so no extra setup is needed.
- Debugging-Friendly: Outputs everything from your solution to the terminal, including errors, for easy debugging.

### 🌟 Contributing

Have ideas to improve this app? Found a bug? Contributions are welcome!

Fork this repository.
Create your feature branch:
```
git checkout -b feature/awesome-feature
```
Commit your changes:
```
git commit -m "Add some awesome feature"
```
Push the branch and create a pull request.

### 📜 License

This project is licensed under the MIT License. Feel free to use it, improve it, and share it.

### 🎉 Happy Coding!
Good luck with your Advent of Code challenges, and may your algorithms always be efficient! 💻✨