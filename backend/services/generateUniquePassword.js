// Function to shuffle a string randomly
function shuffleString(input) {
    const array = input.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array.join('');
  }
  
  // Function to insert a number randomly into a string
  function insertNumber(input, number) {
    const randomIndex = Math.floor(Math.random() * (input.length + 1));
    const array = input.split('');
    array.splice(randomIndex, 0, number.toString());
    return array.join('');
  }

export const generateUniquePassword = (name,email)=>{
    const combinedString = `${name}${email}`;

  // Shuffle the characters to make it random
  const shuffledString = shuffleString(combinedString);

  // Generate 1 random number and add it to the password
  const randomNumber = Math.floor(Math.random() * 10);
  const passwordWithNumber = insertNumber(shuffledString, randomNumber);

  return passwordWithNumber;
  
}