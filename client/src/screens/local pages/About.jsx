import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center p-6">

      {/* Title Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-800 text-center mb-6 mt-10">
        About <span className="text-teal-600">Hospital Inventory Management System</span>
      </h1>

      {/* Card Section */}
      <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-8 text-gray-700 space-y-4">
        <p className="text-lg leading-relaxed">
          <span className="font-semibold text-teal-700">Hospital Inventory Management System</span> is a full-stack web application developed using the
          <span className="font-semibold"> MERN stack</span> (MongoDB, Express.js, React.js, Node.js). It is designed to digitally manage medicines, medical equipment,
          and healthcare supplies in hospitals with accuracy and efficiency.
        </p>

        <p className="text-base leading-relaxed">
          The system replaces manual registers and spreadsheet-based inventory tracking with a secure, centralized, and automated solution.
        </p>

        <p className="text-base leading-relaxed">
          The project highlights modern web development technologies and features such as:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-medium text-teal-700">React.js</span> frontend with a responsive and user-friendly interface</li>
          <li><span className="font-medium text-teal-700">Node.js</span> and <span className="font-medium text-teal-700">Express.js</span> backend for secure REST APIs</li>
          <li><span className="font-medium text-teal-700">MongoDB</span> for reliable and scalable data storage</li>
          <li><span className="font-medium text-teal-700">JWT Authentication</span> for secure user access</li>
          <li>Real-time stock monitoring and expiry date tracking</li>
          <li>Low-stock alerts and inventory reporting</li>
        </ul>

        <p className="text-base leading-relaxed">
          The main objective of this project is to improve hospital workflow efficiency, reduce human errors, prevent medicine shortages,
          and enhance patient safety through accurate inventory control.
        </p>

        <p className="text-base leading-relaxed">
          This system is developed as an academic and practical project to demonstrate real-world application development using modern
          full-stack technologies. It is ideal for final year projects, portfolio showcase, and real hospital use with future enhancements.
        </p>
      </div>

    </div>
  )
}

export default About;
