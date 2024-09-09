'use client';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Select from 'react-select';

export default function Dashboard() {
  const [pagestatus, setpagestatus] = useState('create');

  const [ideatitle, setideatitle] = useState('');
  const [ideacategories, setideacategories] = useState('');
  const [loading, setLoading] = useState(false);
  const [createideadone, setcreateideadone] = useState(false);
  const [problemSolved, setProblemSolved] = useState('');
  const [possibleSolution, setPossibleSolution] = useState('');
  const [additional, setAdditional] = useState('');
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState('');

  const handleAddResource = () => {
    if (newResource) {
      setResources([...resources, newResource]);
      setNewResource('');
    }
  };

  const handleRemoveResource = (index) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const options = [
    { value: 'Payment', label: 'Payment' },
    { value: 'ConsumerDapp', label: 'ConsumerDapp' },
    { value: 'Nft', label: 'Nft' },
    { value: 'DeFi', label: 'DeFi' },
    { value: 'DePin', label: 'DePin' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Social', label: 'Social' },
    { value: 'AI', label: 'AI' },
    { value: 'Content', label: 'Content' },
    { value: 'DeveloperTooling', label: 'DeveloperTooling' },
    { value: 'Community', label: 'Community' },
  ];

  const categories = [
    'Payment',
    'ConsumerDapp',
    'Nft',
    'DeFi',
    'DePin',
    'Gaming',
    'Social',
    'AI',
    'Content',
    'DeveloperTooling',
  ];

  const categoryColors = {
    Payment: '#B3E5FC', // Pastel Blue
    ConsumerDapp: '#FFB3B3', // Pastel Coral
    Nft: '#C5CAE9', // Pastel Lavender
    DeFi: '#B9E4C9', // Pastel Sage
    DePin: '#D5AAFF', // Pastel Purple
    Gaming: '#FFE3B3', // Pastel Peach
    Social: '#B3E0E5', // Pastel Aqua
    AI: '#E2A3E0', // Pastel Lemon
    Content: '#D0F4DE', // Pastel Mint
    DeveloperTooling: '#F9E2AE', // Pastel Lilac
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setideacategories(value);
    } else {
      setideacategories(
        ideacategories.filter((category) => category !== value)
      );
    }
  };

  async function saveIdea(snlData) {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snlData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('IPFS Hash:', data.IpfsHash);
    } else {
      console.error('Error saving data:', await response.json());
    }
  }

  async function postIdea(snlData) {
    const response = await fetch('/api/idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snlData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Idea Created:', data.idea);
      return data.idea;
    } else {
      console.error('Error saving idea:', await response.json());
    }
  }

  const createidea = async () => {
    const wallet = Cookies.get('idea_wallet');
    setLoading(true);

    if (!ideatitle) {
      alert('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      let snlData = {
        title: ideatitle,
        category: ideacategories,
        creatorWalletAddress: wallet,
      };

      const token = Cookies.get('access-token'); // Assuming JWT is stored as 'idea_token'
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      let postData = {
        title: ideatitle,
        category: ideacategories.value,
        userId: userId,
        problem_solved: problemSolved,
        possible_solution: possibleSolution,
        resources: resources,
        additional: additional,
      };

      console.log('idea data', snlData, postData);

      try {
        // await saveIdea(snlData);

        const data_to_contract = await postIdea(postData);

        console.log('idea posted');

        try {
          const mintTransaction = {
            arguments: [
              `${data_to_contract.id}`,
              '0x8ccc0aaa87309ab8c7f8c1c68e87e33732c03289a289701a3eaf75c78f283579',
            ],
            function:
              '0x8ccc0aaa87309ab8c7f8c1c68e87e33732c03289a289701a3eaf75c78f283579::sharetos::add_idea',
            type: 'entry_function_payload',
            type_arguments: [],
          };

          const mintResponse = await window.aptos.signAndSubmitTransaction(
            mintTransaction
          );

          console.log('created idea done:', mintResponse);
          setcreateideadone(true);

          setTimeout(() => {
            window.location.replace('/');
          }, 2000);
        } catch {
          console.log('error');
        }
      } catch (error) {
        console.error('Error handling', error);
      }
    } catch (error) {
      console.error('Error handling', error);
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none', // Remove border
      boxShadow: 'none', // Remove box shadow
      padding: '6px', // Increase padding
      borderRadius: 10,
      height: 65,
      '&:hover': {
        border: 'none', // Ensure no border on hover
      },
    }),
    // Increase padding in the dropdown menu
    menu: (provided) => ({
      ...provided,
      padding: '6px', // Adjust as needed
      borderRadius: 10,
    }),
    // Increase padding inside the single value (selected item)
    singleValue: (provided) => ({
      ...provided,
      padding: '6px', // Adjust as needed
    }),
    // Increase padding for the placeholder text
    placeholder: (provided) => ({
      ...provided,
      padding: '6px', // Adjust as needed
    }),
  };

  return (
    <>
      <main
        className="flex flex-col items-center justify-between lg:p-10 md:p-10 py-14"
        // style={{ background: 'radial-gradient(circle, #000000 , #000000)' }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        {pagestatus === 'create' && (
          <div className="w-full z-0 lg:px-60">
            <div
              className="px-10 py-10 rounded-2xl mt-0"
              style={{
                border: '1px solid #607d8b',
                boxShadow: 'inset -10px -10px 60px 0 rgba(0, 0, 0, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            >
              <div>
                <div className="font-bold text-2xl text-white">
                  Share your Idea with Community
                </div>
                <div className="lg:flex md:flex justify-between gap-4">
                  <div className="lg:w-1/2 md:w-1/2 mt-10">
                    <div>
                      <div className="text-white mb-4 text-lg">Idea Title</div>
                      <input
                        type="text"
                        placeholder="Idea Title"
                        value={ideatitle}
                        onChange={(e) => setideatitle(e.target.value)}
                        className="mb-8 shadow border appearance-none rounded-xl w-full py-4 px-6 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        style={{
                          border: '1px solid #75E2FF',
                          color: 'black',
                          backgroundColor: 'white',
                        }}
                      />
                    </div>
                  </div>

                  <div className="lg:w-1/2 md:w-1/2 mt-10">
                    <div>
                      <div className="text-white mb-4 text-lg">
                        Select Category
                      </div>
                      <Select
                        options={options}
                        styles={customStyles}
                        isSearchable={false}
                        placeholder={'Select Category'}
                        value={ideacategories} // Bind the selected value
                        onChange={(selectedOption) =>
                          setideacategories(selectedOption)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-10 text-lg">
                  <div className="mb-6">
                    <label className="block text-white mb-2">
                      Problem Solved
                    </label>
                    <textarea
                      value={problemSolved}
                      onChange={(e) => setProblemSolved(e.target.value)}
                      rows="4"
                      className="w-full p-4 rounded-lg border-gray-300"
                      placeholder="Describe the problem solved..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2">
                      Possible Solution
                    </label>
                    <textarea
                      value={possibleSolution}
                      onChange={(e) => setPossibleSolution(e.target.value)}
                      rows="4"
                      className="w-full p-4 rounded-lg border-gray-300"
                      placeholder="Describe the possible solution..."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2">Resources</label>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)}
                        className="w-full p-4 rounded-lg border-gray-300"
                        placeholder="Add a new resource..."
                      />
                      <button
                        type="button"
                        onClick={handleAddResource}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 focus:ring-cyan-800 text-sm"
                      >
                        Add Resource
                      </button>
                    </div>
                    <ul className="list-disc">
                      {resources.map((resource, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center text-white"
                        >
                          <span>
                            {index + 1}. {resource}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveResource(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white mb-2">Additional</label>
                    <textarea
                      value={additional}
                      onChange={(e) => setAdditional(e.target.value)}
                      rows="4"
                      className="w-full p-4 rounded-lg border-gray-300"
                      placeholder="Anything else you want to share..."
                    />
                  </div>
                </div>

                <button
                  onClick={createidea}
                  className="rounded-lg py-2.5 px-14 text-white justify-center flex mx-auto text-xl bg-gradient-to-r from-[#539b82] to-[#aba564]"
                  // style={{ backgroundColor: '#9B86BD' }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {createideadone && (
          <div
            style={{ backgroundColor: '#222944E5' }}
            className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
            id="popupmodal"
          >
            <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
              <div className="relative rounded-lg shadow bg-black text-white">
                <div className="flex items-center justify-end p-4 md:p-5 rounded-t border-gray-600"></div>

                <div className="p-4 space-y-4 pt-10">
                  <p className="text-3xl text-center font-bold text-green-500">
                    Successfully Submitted!!
                  </p>
                  <p className="text-sm text-center pt-4 pb-20">
                    Redirecting you back to view your submitted idea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div
            style={{ backgroundColor: '#222944E5' }}
            className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
            id="popupmodal"
          >
            <div className="relative p-4 w-full max-h-full">
              <div className="relative rounded-lg">
                <div className="flex justify-center gap-4">
                  <img
                    src="/smallloader.gif"
                    alt="Loading icon"
                    className="w-20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
