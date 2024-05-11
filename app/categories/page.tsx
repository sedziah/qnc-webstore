// app/categories/page.tsx

'use client';
import Image from 'next/image';
import styles from './page.module.css'; // Import the CSS module
import Breadcrumbs from '../../components/breadcrumbs/index'; // Import the Breadcrumbs component

// Sample JSON data
const sampleCategories = [
  {
    id: 'cat1',
    name: 'Electronics',
    icon: '/images/default-image.png', // Sample image path
  },
  {
    id: 'cat2',
    name: 'Books',
    icon: '/images/default-image.png', // Sample image path
  },

  {
    id: 'cat2',
    name: 'Books',
    icon: '/images/default-image.png', // Sample image path
  },

  {
    id: 'cat2',
    name: 'Books',
    icon: '/images/default-image.png', // Sample image path
  },

  {
    id: 'cat2',
    name: 'Books',
    icon: '/images/default-image.png', // Sample image path
  },
  // Add more categories as needed
];

interface CategoryItemProps {
  name: string;
  imageUrl: string;
}

const defaultImageUrl = '/images/default-image.png'; // Default image path

const CategoryItem: React.FC<CategoryItemProps> = ({ name, imageUrl }) => {
  return (
    <div className={styles.category}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl || defaultImageUrl}
          alt={name}
          layout='fill'
          objectFit='cover' // Cover ensures the image fills the area
        />
      </div>
      <p>{name}</p>
    </div>
  );
};

const Page: React.FC = () => {
  const crumbs = [
    { title: 'Home', href: '/' },
    { title: 'Categories', href: '/categories' },
  ];
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <div className={styles.categoriesContainer}>
        {sampleCategories.map((category) => (
          <CategoryItem
            key={category.id}
            name={category.name}
            imageUrl={category.icon}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
