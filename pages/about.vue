<template>
    <div class="about-container">
        <div class="header-section">
            <h1>Your Name</h1>
            <p>Dive Into An Interactive Playground</p>
        </div>
        <div class="main-content">
            <div class="blur-bg">
                <div class="content-description">
                    <p>Explore and immerse yourself in a range of interactive components and features inspired by the movie "Your Name". This platform stands as a testament to coding prowess and creative passion, all centered around this iconic film.</p>
                    
                    <p>Experiment, interact, and delve into the world of "Your Name". We value your insights, feedback, and innovative ideas to refine this digital experience!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

:root {
    --primary-gradient: linear-gradient(120deg, #F093FB 0%, #F5576C 100%);
    --secondary-color: #F5576C;
}

.about-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    font-family: 'Poppins', sans-serif; /* Using a modern font family */
    background: var(--primary-gradient);
    padding: 50px 0;
}

.header-section {
    margin-bottom: 60px;
    text-align: center;
}

.header-section h1 {
    font-size: 4rem;
    color: #FFF;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Added a subtle text shadow */
}

.header-section p {
    color: #FFF;
    font-size: 1.5rem;
    opacity: 0.9;
}

.main-content {
    width: 80%;
    position: relative;
}

.blur-bg {
    backdrop-filter: blur(15px);
    padding: 40px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transition: 0.3s ease-in-out;
    transform: translateY(0); /* Initial state */
}

.blur-bg:hover {
    background-color: rgba(255, 255, 255, 0.95);
    transform: translateY(-5px); /* Creates a gentle lift effect */
}
.blur-bg:hover .content-description p {
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
}

.content-description p {
    color: #333;
    font-size: 1.3rem;
    line-height: 1.8;
    margin: 25px 0;
}
</style>
