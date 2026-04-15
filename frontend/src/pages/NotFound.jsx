import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <style>{`
        .not-found-wrapper {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: radial-gradient(circle at top, #2a2548, #171427 65%);
          font-family: Inter, Arial, sans-serif;
          padding: 24px;
        }
        .not-found-wrapper .page-404 {
          width: min(920px, 100%);
          background: #fff;
          border-radius: 24px;
          padding: 50px 40px;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0,0,0,.35);
          position: relative;
          overflow: hidden;
        }
        .not-found-wrapper .page-404::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(105,193,76,.05), transparent 40%);
          pointer-events: none;
        }
        .not-found-wrapper .code {
          font-size: 96px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #1f1f1f;
          animation: not-found-float 2.8s ease-in-out infinite;
        }
        .not-found-wrapper .scene {
          position: relative;
          height: 260px;
          max-width: 620px;
          margin: 0 auto 24px;
        }
        .not-found-wrapper .ground {
          position: absolute; left: 10%; right: 10%; bottom: 32px; height: 6px;
          background: #ececec; border-radius: 10px;
        }
        .not-found-wrapper .stone-left, 
        .not-found-wrapper .stone-right, 
        .not-found-wrapper .bush1, 
        .not-found-wrapper .bush2 {
          position: absolute; bottom: 32px;
        }
        .not-found-wrapper .stone-left { left: 60px; width: 70px; height: 80px; background: #ddd; border-radius: 50% 50% 40% 40%; }
        .not-found-wrapper .stone-right { right: 70px; width: 90px; height: 130px; background: #e3e3e3; border-radius: 45px 45px 20px 20px; }
        .not-found-wrapper .bush1, 
        .not-found-wrapper .bush2 { width: 22px; height: 14px; background: #69c14c; border-radius: 20px 20px 4px 4px; }
        .not-found-wrapper .bush1 { left: 135px; } 
        .not-found-wrapper .bush2 { right: 150px; }

        .not-found-wrapper .rope {
          position: absolute;
          left: 50%; bottom: 98px;
          width: 240px; height: 3px; background: #222;
          transform-origin: center;
          animation: not-found-rope 2.8s ease-in-out infinite;
        }
        .not-found-wrapper .person {
          filter: drop-shadow(0 8px 8px rgba(0,0,0,.12));
          position: absolute;
          left: 50%; bottom: 38px;
          width: 90px; height: 150px;
          transform: translateX(-50%);
          animation: not-found-sway 2.8s ease-in-out infinite;
        }
        .not-found-wrapper .head { position: absolute; top: 0; left: 27px; width: 38px; height: 40px; background: linear-gradient(180deg, #f3c9a5, #e7b58d); border-radius: 48% 48% 44% 44%; z-index: 2; box-shadow: inset 0 -3px 0 rgba(0,0,0,.05); }
        .not-found-wrapper .face { position: absolute; inset: 0; }
        .not-found-wrapper .eye { position: absolute; top: 15px; width: 4px; height: 4px; background: #2b1d16; border-radius: 50%; }
        .not-found-wrapper .eye.left { left: 10px; } 
        .not-found-wrapper .eye.right { right: 10px; }
        .not-found-wrapper .nose { position: absolute; left: 17px; top: 17px; width: 4px; height: 7px; background: #d79d74; border-radius: 4px; }
        .not-found-wrapper .mouth { position: absolute; left: 12px; bottom: 8px; width: 14px; height: 6px; border-bottom: 2px solid #7a4a34; border-radius: 0 0 10px 10px; }
        .not-found-wrapper .hair { position: absolute; top: -3px; left: 1px; width: 36px; height: 20px; background: #4a2a1b; border-radius: 22px 22px 12px 12px; }
        .not-found-wrapper .ear { position: absolute; top: 16px; width: 5px; height: 8px; background: #e7b58d; border-radius: 50%; }
        .not-found-wrapper .ear.left { left: -3px; } 
        .not-found-wrapper .ear.right { right: -3px; }
        .not-found-wrapper .beard { position: absolute; top: 24px; left: 7px; width: 24px; height: 12px; background: #4a2a1b; border-radius: 0 0 12px 12px; }
        .not-found-wrapper .torso {
          box-shadow: inset -6px 0 0 rgba(0,0,0,.06);
          position: absolute; top: 28px; left: 22px; width: 46px; height: 70px;
          background: repeating-linear-gradient(45deg, #d5a15d 0 10px, #c48b47 10px 20px);
          border-radius: 10px;
        }
        .not-found-wrapper .limb { position: absolute; background: #efc29c; border-radius: 20px; }
        .not-found-wrapper .arm-l { width: 10px; height: 42px; left: 14px; top: 36px; transform: rotate(35deg); }
        .not-found-wrapper .arm-r { width: 10px; height: 42px; right: 12px; top: 34px; transform: rotate(-30deg); }
        .not-found-wrapper .leg-l { width: 10px; height: 52px; left: 30px; bottom: 0; }
        .not-found-wrapper .leg-r { width: 10px; height: 52px; right: 28px; bottom: 0; }

        .not-found-wrapper h2 { font-size: 38px; color: #2a2a2a; margin-bottom: 10px; line-height: 1.2; }
        .not-found-wrapper p { font-size: 18px; color: #777; margin-bottom: 26px; }
        .not-found-wrapper .btn {
          display: inline-block; text-decoration: none; color: #fff;
          background: linear-gradient(135deg, #76d65b, #57ad3d);
          padding: 14px 30px; border-radius: 10px; font-weight: 700;
          box-shadow: 0 10px 20px rgba(105,193,76,.35);
          transition: .25s ease;
        }
        .not-found-wrapper .btn:hover { transform: translateY(-3px) scale(1.02); }

        @keyframes not-found-float { 50% { transform: translateY(-10px); } }
        @keyframes not-found-sway { 50% { transform: translateX(-50%) rotate(4deg); } }
        @keyframes not-found-rope { 0%, 100% { transform: translateX(-50%) rotate(-8deg); } 50% { transform: translateX(-50%) rotate(8deg); } }

        @media (max-width: 600px) {
          .not-found-wrapper .page-404 { padding: 34px 20px; }
          .not-found-wrapper .code { font-size: 72px; }
          .not-found-wrapper h2 { font-size: 30px; }
          .not-found-wrapper .scene { height: 220px; }
        }
      `}</style>
      <div className="not-found-wrapper !absolute inset-0 z-[100]">
        <section className="page-404">
          <div className="code">404</div>
          <div className="scene">
            <div className="ground"></div>
            <div className="stone-left"></div>
            <div className="stone-right"></div>
            <div className="bush1"></div>
            <div className="bush2"></div>
            <div className="rope"></div>
            <div className="person">
              <div className="head">
                <div className="hair"></div>
                <div className="ear left"></div><div className="ear right"></div>
                <div className="face">
                  <div className="eye left"></div>
                  <div class="eye right"></div>
                  <div className="nose"></div>
                  <div className="mouth"></div>
                </div>
                <div className="beard"></div>
              </div>
              <div className="torso"></div>
              <div className="limb arm-l"></div>
              <div className="limb arm-r"></div>
              <div className="limb leg-l"></div>
              <div className="limb leg-r"></div>
            </div>
          </div>
          <h2>Look like you're lost</h2>
          <p>The page you are trying to reach doesn’t exist or has been moved.</p>
          <Link className="btn" to="/">Go to Home</Link>
        </section>
      </div>
    </>
  );
};

export default NotFound;
