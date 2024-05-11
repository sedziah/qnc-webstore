// components/Breadcrumbs.tsx

import Link from 'next/link';
import styles from './Breadcrumbs.module.css'; // Update the import path as needed

// Interface for breadcrumb items
interface BreadcrumbItem {
  title: string;
  href?: string;
}

const Breadcrumbs: React.FC<{ crumbs: BreadcrumbItem[] }> = ({ crumbs }) => {
  if (!crumbs?.length) {
    return null;
  }

  return (
    <nav aria-label='breadcrumb' className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        {crumbs.map((crumb, i) => (
          <li key={i} className={styles.breadcrumbItem}>
            {crumb.href ? (
              <Link className={styles.breadcrumbLink} href={crumb.href}>
                {crumb.title}
              </Link>
            ) : (
              <span className={styles.breadcrumbActive}>{crumb.title}</span>
            )}
            {/* {i < crumbs.length - 1 && (
              <span className={styles.breadcrumbItem}> / </span>
            )} */}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
