// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className='bg-white mt-10 border-t py-4 text-center text-sm text-gray-500'>
      © {new Date().getFullYear()} Employee Management System. All rights reserved.
    </footer>
  );
};

export default Footer;
