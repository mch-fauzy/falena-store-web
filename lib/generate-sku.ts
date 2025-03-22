interface GenerateSkuProps {
  category: string;
  brand: string;
  color: string;
  size: string;
}

const generateSku = (props: GenerateSkuProps) => {
  const {category, brand, color, size} = props;
  const categoryCode = category
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3); // Take first 3 initials of category

  const brandCode = brand.slice(0, 5).toUpperCase();

  const colorWords = color.split(' ');
  const colorCode =
    colorWords.length === 1
      ? colorWords[0].slice(0, 3).toUpperCase() // First 3 letters if single word
      : colorWords
          .map(word => word[0])
          .join('')
          .toUpperCase(); // First letter of each word if multiple words

  const sizeCode = size.toUpperCase();

  return `${categoryCode}-${brandCode}-${colorCode}-${sizeCode}`;
};

export {generateSku};
