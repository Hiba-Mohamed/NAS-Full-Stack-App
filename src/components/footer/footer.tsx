export function Footer() {
  return (
    <footer className="bg-white font-OpenSans px-2 py-4 sm:py-8 text-sm">
      <div className="flex gap-2 flex-col items-center">
        <img src="images/NAS-logo.png" alt="NAS logo" className="h-6" />
        <p className="block text-center text-blue font-bold">
          Created by Hiba Mohamed using Vite, Node.js, and Canva
        </p>
        <p className="block text-center">
          <strong>Disclaimer:</strong> Used pictures from Canva{" "}
        </p>
        <span className="block text-center">© 2023 All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
