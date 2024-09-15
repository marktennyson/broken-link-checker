import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <>
    {/*?xml version="1.0" encoding="UTF-8"?*/}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      className={className}
    >
      <path
        d="M0 0 C0.99 0 1.98 0 3 0 C3 1.65 3 3.3 3 5 C3.66 4.34 4.32 3.68 5 3 C5.99 3 6.98 3 8 3 C7.835 3.598125 7.67 4.19625 7.5 4.8125 C6.8885876 7.11344336 6.8885876 7.11344336 7 10 C7.825 10.928125 8.65 11.85625 9.5 12.8125 C11.62768054 15.22949687 11.98438553 15.8840068 12.4375 19.25 C12 22 12 22 10 24 C3.52951016 24 0.36501241 21.33847738 -4 17 C-4.66 17.33 -5.32 17.66 -6 18 C-7.80948495 18.12176503 -9.62396271 18.17545792 -11.4375 18.1875 C-12.40558594 18.20167969 -13.37367187 18.21585938 -14.37109375 18.23046875 C-17 18 -17 18 -20 16 C-20.375 12.5 -20.375 12.5 -20 9 C-16.47320901 6.64880601 -14.97120515 6.78556548 -10.8125 6.875 C-9.72582031 6.89304687 -8.63914062 6.91109375 -7.51953125 6.9296875 C-6.27236328 6.96449219 -6.27236328 6.96449219 -5 7 C-5.33 6.67 -5.66 6.34 -6 6 C-6.04063832 4.33382885 -6.042721 2.66611905 -6 1 C-5.01 1 -4.02 1 -3 1 C-2.67 1.66 -2.34 2.32 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z M-3 7 C-3.33 7.66 -3.66 8.32 -4 9 C-3.34 9.66 -2.68 10.32 -2 11 C-2 10.34 -2 9.68 -2 9 C-0.35 9.99 1.3 10.98 3 12 C3.33 11.01 3.66 10.02 4 9 C1.69 8.34 -0.62 7.68 -3 7 Z M-17 11 C-17 11.99 -17 12.98 -17 14 C-15.02 14 -13.04 14 -11 14 C-11 13.01 -11 12.02 -11 11 C-10.01 10.67 -9.02 10.34 -8 10 C-12.65052872 9.73067479 -12.65052872 9.73067479 -17 11 Z M3 12 C2.34 13.32 1.68 14.64 1 16 C2.74934898 18.08333079 2.74934898 18.08333079 5 20 C6.32 20 7.64 20 9 20 C7.73058503 16.08597051 6.48832306 14.20927127 3 12 Z "
        fill="#0B2898"
        transform="translate(20,4)"
      />
      <path
        d="M0 0 C1.43859375 -0.00773438 1.43859375 -0.00773438 2.90625 -0.015625 C5.5 0.25 5.5 0.25 8.5 2.25 C8.5 2.91 8.5 3.57 8.5 4.25 C3.88 4.25 -0.74 4.25 -5.5 4.25 C-5.5 5.24 -5.5 6.23 -5.5 7.25 C-3.85 7.25 -2.2 7.25 -0.5 7.25 C-0.17 8.57 0.16 9.89 0.5 11.25 C-5.125 11.5 -5.125 11.5 -8.5 9.25 C-8.875 5.75 -8.875 5.75 -8.5 2.25 C-5.14802157 0.01534771 -3.92208754 -0.02108649 0 0 Z "
        fill="#0447BC"
        transform="translate(8.5,10.75)"
      />
      <path
        d="M0 0 C0.99 0 1.98 0 3 0 C3 1.65 3 3.3 3 5 C3.66 4.34 4.32 3.68 5 3 C5.99 3 6.98 3 8 3 C7.42655063 5.86724686 7.1385485 6.8614515 5 9 C2.90625 9.046875 2.90625 9.046875 0.5 8.75 C-0.69109375 8.61851563 -0.69109375 8.61851563 -1.90625 8.484375 C-4 8 -4 8 -6 6 C-6.125 3.375 -6.125 3.375 -6 1 C-5.01 1 -4.02 1 -3 1 C-2.67 1.66 -2.34 2.32 -2 3 C-1.34 2.01 -0.68 1.02 0 0 Z "
        fill="#F3330A"
        transform="translate(20,4)"
      />
      <path
        d="M0 0 C1.32 0.66 2.64 1.32 4 2 C4 2.99 4 3.98 4 5 C-0.29 5 -4.58 5 -9 5 C-9 4.01 -9 3.02 -9 2 C-6.03 2 -3.06 2 0 2 C0 1.34 0 0.68 0 0 Z "
        fill="#586081"
        transform="translate(18,13)"
      />
      <path
        d="M0 0 C0.99 0 1.98 0 3 0 C3.33 0.66 3.66 1.32 4 2 C4.33 1.34 4.66 0.68 5 0 C5.66 0 6.32 0 7 0 C6.67 2.31 6.34 4.62 6 7 C1.125 6.125 1.125 6.125 0 5 C-0.04063832 3.33382885 -0.042721 1.66611905 0 0 Z "
        fill="#FD6F22"
        transform="translate(14,5)"
      />
      <path
        d="M0 0 C0.33 0.66 0.66 1.32 1 2 C2.98 2 4.96 2 7 2 C7.33 3.32 7.66 4.64 8 6 C2.25 6.125 2.25 6.125 0 5 C0 3.35 0 1.7 0 0 Z "
        fill="#0546BC"
        transform="translate(1,16)"
      />
      <path
        d="M0 0 C2.31 0.33 4.62 0.66 7 1 C7.33 1.99 7.66 2.98 8 4 C5.36 3.67 2.72 3.34 0 3 C0 2.01 0 1.02 0 0 Z "
        fill="#0A2A95"
        transform="translate(9,11)"
      />
      <path
        d="M0 0 C2.31 0 4.62 0 7 0 C7 0.99 7 1.98 7 3 C4.69 3 2.38 3 0 3 C0 2.01 0 1.02 0 0 Z "
        fill="#999BA0"
        transform="translate(9,15)"
      />
    </svg>
  </>
);

export default Logo;
