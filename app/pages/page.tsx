'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import ChatInterface from '../components/ChatInterface';

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/your-kit-id.css"
        />
        <title>Donna's Den | Chat Assistant</title>
        <meta name="description" content="Purdue Fort Wayne Chat Assistant" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-pink-50 p-4 relative">
        {/* Donna's Den Banner */}
        <div className="w-full flex items-center justify-center py-6">
          <img
            src="/images/donnas_den.png"
            alt="Donna's Den Banner"
            className="w-full h-auto object-contain px-4"
          />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
          {/* Visit PFW Card */}
          <a
            href="https://www.pfw.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border-2 border-yellow-500 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-xl font-bold text-black">Visit PFW</h3>
            <p className="mt-2 text-gray-600">
              Explore Purdue University Fort Wayne’s campus and discover why it’s a great place to learn and grow.
            </p>
          </a>

          {/* Majors & Minors Card */}
          <a
            href="https://www.pfw.edu/academics-research/majors-minors"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border-2 border-yellow-500 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-xl font-bold text-black">Majors & Minors</h3>
            <p className="mt-2 text-gray-600">
              Browse through the list of available academic programs at PFW.
            </p>
          </a>

          {/* Contact Us Card */}
          <a
            href="https://www.pfw.edu/offices/safety/contact/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border-2 border-yellow-500 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <h3 className="text-xl font-bold text-black">Contact Us</h3>
            <p className="mt-2 text-gray-600">
              Have questions? Reach out to our team and we’ll be happy to help!
            </p>
          </a>
        </div>

        {/* Chat Icon in Bottom-Right Corner */}
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 hover:opacity-80 transition-opacity z-50"
        >
          <img
            src="/images/chatbot.png"
            alt="Chat Icon"
            className="h-20 w-20"
          />
        </button>

        {/* Chat Interface Popup */}
        {isChatOpen && (
          <div
            className={`fixed ${
              isFullScreen ? 'inset-0' : 'bottom-24 right-4'
            } z-50 bg-white shadow-lg rounded-lg transition-all`}
          >
            <ChatInterface
              onClose={toggleChat}
              fullScreen={isFullScreen}
            />
            <div className="text-center mt-2">
              <button
                onClick={toggleFullScreen}
                className="text-blue-500 hover:underline text-sm"
              >
                {isFullScreen ? 'Exit Full Screen' : 'Go Full Screen'}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
