/* eslint-disable */
"use client";

import {useEffect, useRef, useState} from 'react';
import screenfull from 'screenfull';
import Link from 'next/link'
import styles from './styles/Player.module.scss';
import PlayerMeta from "./PlayerMeta";

type TPlayerProps = {
    options: {
        flashFullwidth: boolean;
        flashIframe: string;
    }
}
const Player = ({ options }: TPlayerProps) => {
    const gameInitialized = useRef<boolean>(false);

    useEffect(() => {
        const flash = document.getElementById('flash-container');

        if (flash == null) {
            return;
        }

        if (!gameInitialized.current) {
            addGameScrollListeners();
        } else {
            window.addEventListener('resize', gameRecalc);
        }

    }, [gameInitialized, addGameScrollListeners, gameRecalc]);

    function canFullscreen() {
        for (const key of [
            'exitFullscreen',
            'webkitExitFullscreen',
            'webkitCancelFullScreen',
            'mozCancelFullScreen',
            'msExitFullscreen',
        ]) {
            if (key in document) {
                return true;
            }
        }
        return false;
    }

    function enableFullscreen(event: Event) {
        event.preventDefault();

        const flash = document.getElementById('flash-container');

        if (flash == null) {return false}

        if (canFullscreen()) {
            if (screenfull.isEnabled) {
                screenfull.request(flash);
            }

            screenfull.on('change', () => {
                changeFullscreen(flash);
            });

        }
    }

    function changeFullscreen(flash: HTMLElement) {
        if (screenfull.isFullscreen) {
            flash.classList.add('fullscreen');
        } else {
            flash.classList.remove('fullscreen');
        }
    }

    function addGameScrollListeners() {
        gameInitialized.current = false;
        window.addEventListener('scroll', gameInit, { once: true, passive: true });
        window.addEventListener('click', gameInit, { once: true, passive: true });
        window.addEventListener('mousemove', gameInit, { once: true, passive: true });
        window.addEventListener('touchstart', gameInit, { once: true, passive: true });
        window.addEventListener('keydown', gameInit, { once: true, passive: true });

        setTimeout(gameInit, 7000);
    }

    function removeGameScrollListeners() {
        window.removeEventListener('scroll', gameInit, false);
        window.removeEventListener('click', gameInit, false);
        window.removeEventListener('mousemove', gameInit, false);
        window.removeEventListener('touchstart', gameInit, false);
        window.removeEventListener('keydown', gameInit, false);
    }

    function gameInit() {
        if (gameInitialized.current === false) {
            gameInitialized.current = true;
            gameLoader();

            setTimeout(() => {
                removeGameScrollListeners();
            }, 100);
        } else {
            removeGameScrollListeners();
        }
    }

    function gameLoader() {
        const flash = document.getElementById('flash-container');
        const btnStart = document.getElementById('js-player-start');

        if (flash == null) {
            return;
        }

        if (btnStart == null) {
            gameInitialize();
            gameRecalc();
        } else {
            btnStart.addEventListener("click", function (event) {
                event.preventDefault();
                playerStart(btnStart, flash);
            });
        }
    }

    function gameInitialize() {
        const iframes = document.querySelectorAll('iframe[external_src]');

        iframes.forEach( (iframe) => {
            let external_src = iframe.getAttribute('external_src');

            if (external_src) {
                iframe.setAttribute('src', external_src);
                iframe.removeAttribute("external_src");
            }
        });
    }

    function playerStart(btnStart: HTMLElement, flash: HTMLElement) {
        const iframe_code = btnStart.dataset.code;
        const overlay = document.getElementById('js-overlay');

        if (iframe_code !== undefined && overlay !== null) {
            flash.innerHTML = iframe_code;
            flash.classList.remove('hidden');
            overlay.classList.add('hidden');
            gameRecalc();
        }
    }

    function gameRecalc() {

        const flash = document.getElementById('flash-container');
        if (flash == null) {
            return;
        }

        if (!options.flashFullwidth) {

            recalcNormal();

        } else {

            recalcFullwidth();
        }
    }

    function recalcFullwidth() {

        const containers = document.querySelectorAll<HTMLElement>('.content-container');
        const exampleContainer = containers[0];
        const gameContainer = document.querySelector('.flash-container');
        const game = document.querySelector('.flash-container iframe');

        if (
          gameContainer === null ||
          exampleContainer === undefined ||
          game === null
        ) {
            return false;
        }

        containers.forEach((container) => {
            container.style.width = '';
            container.style.maxWidth = '';
        })

        var containerWidth = exampleContainer.clientWidth;

        var gameWidth = game.clientWidth;
        game.classList.add('hidden');

        var gameWidthRendered = gameContainer.clientWidth;

        var differentWidth = gameWidth - gameWidthRendered;

        let fullwidthContent = containerWidth + differentWidth;

        containers.forEach((container) => {
            container.style.width = fullwidthContent + 'px';
            container.style.maxWidth = fullwidthContent + 'px';
        })

        game.classList.remove('hidden');
    }

    function recalcNormal() {

        const flash = document.getElementById('flash-container');
        if (flash == null) {
            return;
        }

        const containers = document.querySelectorAll<HTMLElement>('.content-container');
        containers.forEach((container) => {
            container.style.width = '';
            container.style.maxWidth = '';
        })

        const iframe = flash.querySelector('iframe');
        if (iframe == null) {
            return;
        }

        var wHeight = window.innerHeight;

        let initWidth = iframe.clientWidth;
        let initHeight = iframe.clientHeight;

        var newWidth, newHeight, ratio = 0;

        iframe.classList.add('hidden');

        newWidth = flash.offsetWidth;

        ratio = initWidth / initHeight;
        newHeight = newWidth / ratio;


        // if result height object > height window
        if (newHeight > wHeight) {
            newHeight = wHeight;
            newWidth = newHeight * ratio;
        }

        if (newHeight > (wHeight - 60) && !flash.classList.contains('fullscreen')) {
            newHeight = wHeight - 60;
            newWidth = newHeight * ratio;
        }

        iframe.setAttribute('width', newWidth.toString());
        iframe.setAttribute('height', newHeight.toString());

        iframe.classList.remove('hidden');

    }


    return (
        <div className={styles.player}>
            <div className={styles.player__inner}>
                <div className={styles.player__content}>
                    <div
                        id="flash-container"
                        className="flash-container"
                        dangerouslySetInnerHTML={{
                            __html: options.flashIframe,
                        }}
                    ></div>

                    <div className={styles.player__actions}>
                        <PlayerMeta
                            handlerFullscreen={enableFullscreen}
                        >
                            <Link
                                href="#"
                                className="btn btn--primary"
                                data-id={`1`}
                                title="Add to my games"
                            >
                                To favorites
                            </Link>

                        </PlayerMeta>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Player;
/* eslint-enable */