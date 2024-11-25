import React from 'react';
import { FaLessThan } from 'react-icons/fa';

function Pop(props) {
  return (
    <div className='absolute top-0 left-0 w-[100vw] min-h-[100vh] h-auto  bg-third z-20 flex justify-center items-center '>
      <div className='w-[80%] shadow-slate-700   shadow-xl p-4  rounded-md lg:w-[35%] '>
        <header className='flex w-full justify-center items-center relative'>
          <FaLessThan
            className='absolute -left-1 text-forth cursor-pointer'
            onClick={props.closePop}
          />

          <h1 className='text-forth font-bold text-lg'>{props.title}</h1>
        </header>
        {props.children}
      </div>
    </div>
  );
}

export default Pop;
