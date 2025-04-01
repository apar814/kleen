
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const Licenses = () => {
  const licenses = [
    {
      name: "React",
      version: "18.3.1",
      license: "MIT",
      description: "A JavaScript library for building user interfaces.",
      url: "https://reactjs.org/"
    },
    {
      name: "React Router",
      version: "6.26.2",
      license: "MIT",
      description: "Declarative routing for React.",
      url: "https://reactrouter.com/"
    },
    {
      name: "Tailwind CSS",
      version: "3.4.1",
      license: "MIT",
      description: "A utility-first CSS framework for rapidly building custom designs.",
      url: "https://tailwindcss.com/"
    },
    {
      name: "shadcn/ui",
      version: "0.5.0",
      license: "MIT",
      description: "Beautifully designed components that you can copy and paste into your apps.",
      url: "https://ui.shadcn.com/"
    },
    {
      name: "Lucide React",
      version: "0.462.0",
      license: "ISC",
      description: "Beautiful & consistent icons for React projects.",
      url: "https://lucide.dev/"
    },
    {
      name: "Recharts",
      version: "2.12.7",
      license: "MIT",
      description: "Redefined chart library built with React and D3.",
      url: "https://recharts.org/"
    },
    {
      name: "React Query",
      version: "5.56.2",
      license: "MIT",
      description: "Hooks for fetching, caching and updating asynchronous data in React.",
      url: "https://tanstack.com/query/v4"
    },
    {
      name: "Zod",
      version: "3.23.8",
      license: "MIT",
      description: "TypeScript-first schema validation with static type inference.",
      url: "https://zod.dev/"
    },
    {
      name: "React Hook Form",
      version: "7.53.0",
      license: "MIT",
      description: "Performant, flexible and extensible forms with easy-to-use validation.",
      url: "https://react-hook-form.com/"
    },
    {
      name: "date-fns",
      version: "3.6.0",
      license: "MIT",
      description: "Modern JavaScript date utility library.",
      url: "https://date-fns.org/"
    }
  ];

  return (
    <DashboardLayout 
      title="Open Source Licenses" 
      description="Acknowledgments for the open source software that powers Kleen"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <div className="prose max-w-none text-kleen-gray/90">
            <h2>Open Source Software</h2>
            <p>
              Kleen is built on the shoulders of giants. We use many open source libraries and tools that make our job easier, and we're grateful to the maintainers and contributors of these projects.
            </p>
            <p>
              This page lists the open source software that powers Kleen, along with their licenses and links to their websites.
            </p>
          </div>
          
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-kleen-light">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-kleen-gray/70">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-kleen-gray/70">Version</th>
                  <th className="px-4 py-3 text-sm font-medium text-kleen-gray/70">License</th>
                  <th className="px-4 py-3 text-sm font-medium text-kleen-gray/70">Description</th>
                  <th className="px-4 py-3 text-sm font-medium text-kleen-gray/70">Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {licenses.map((lib, index) => (
                  <tr key={index} className="hover:bg-kleen-light/50">
                    <td className="px-4 py-3 font-medium">{lib.name}</td>
                    <td className="px-4 py-3 text-kleen-gray/70">{lib.version}</td>
                    <td className="px-4 py-3">
                      <span className="bg-kleen-mint/10 text-kleen-mint px-2 py-1 rounded-full text-xs font-medium">
                        {lib.license}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-kleen-gray/70">{lib.description}</td>
                    <td className="px-4 py-3">
                      <a 
                        href={lib.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-kleen-mint hover:underline"
                      >
                        Visit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 prose max-w-none text-kleen-gray/90">
            <h3>License Texts</h3>
            <p>
              Most of the libraries we use are licensed under the MIT License, which is reproduced below:
            </p>
            
            <div className="bg-kleen-light p-4 rounded-md mt-4">
              <h4 className="font-mono text-sm font-medium mb-2">MIT License</h4>
              <p className="font-mono text-xs text-kleen-gray/80 whitespace-pre-line">
                Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

                The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
              </p>
            </div>
            
            <p className="mt-6">
              For full license texts and more information, please visit the respective websites of each library.
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Licenses;
